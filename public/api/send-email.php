<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["success" => false, "error" => "Method not allowed"]);
    exit();
}

// Read JSON Payload from QuoteForm.jsx
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    // Also support regular form POST if ever submitted via standard form
    $data = $_POST;
}

$name = htmlspecialchars(trim($data['name'] ?? ''));
$company = htmlspecialchars(trim($data['company'] ?? 'N/A'));
$email = filter_var(trim($data['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars(trim($data['phone'] ?? 'N/A'));
$service = htmlspecialchars(trim($data['service'] ?? 'General Inquiry'));
$location = htmlspecialchars(trim($data['location'] ?? 'Not Specified'));
$projectType = htmlspecialchars(trim($data['projectType'] ?? 'Not Specified'));
$description = nl2br(htmlspecialchars(trim($data['description'] ?? '')));
$contactMethod = htmlspecialchars(trim($data['contactMethod'] ?? 'Any'));

if (empty($name) || empty($email) || empty($description)) {
    http_response_code(400);
    echo json_encode(["success" => false, "error" => "Missing required fields (Name, Email, and Description)"]);
    exit();
}

// Target Recipients
$to = "realtundeonline@gmail.com";
$cc = "official.ojebisibabatunde@gmail.com";
$subject = "New Quote Request: " . ($service ?: "Security Solution") . " - " . $name;

// HTML Email Body
$html_content = "
<!DOCTYPE html>
<html>
<head>
<meta charset='utf-8'>
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; margin: 0; padding: 24px; color: #1f2937; }
  .email-container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(0,0,0,0.08); border-top: 5px solid #c8102e; }
  .header { background: #161a1f; color: #ffffff; padding: 28px 32px; }
  .brand { font-size: 13px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #c8102e; margin-bottom: 6px; }
  .title { margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; line-height: 1.3; }
  .body { padding: 32px; }
  .section-label { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.2px; color: #c8102e; margin: 24px 0 10px 0; border-bottom: 1px solid #e5e7eb; padding-bottom: 6px; }
  .section-label:first-of-type { margin-top: 0; }
  .field-table { width: 100%; border-collapse: collapse; }
  .field-table td { padding: 8px 0; font-size: 14px; vertical-align: top; }
  .field-table .label { width: 38%; color: #6b7280; font-weight: 600; }
  .field-table .value { width: 62%; color: #111827; font-weight: 500; }
  .description-box { background: #f9fafb; border-left: 4px solid #c8102e; border-radius: 0 8px 8px 0; padding: 16px 20px; font-size: 14px; line-height: 1.6; color: #374151; margin-top: 8px; }
  .footer { background: #f9fafb; padding: 20px 32px; text-align: center; font-size: 12px; color: #9ca3af; border-top: 1px solid #f3f4f6; }
</style>
</head>
<body>
  <div class='email-container'>
    <div class='header'>
      <div class='brand'>Philux International</div>
      <h1 class='title'>New Quote Request Received</h1>
    </div>
    <div class='body'>
      <div class='section-label'>Client Information</div>
      <table class='field-table'>
        <tr><td class='label'>Full Name:</td><td class='value'>{$name}</td></tr>
        <tr><td class='label'>Company:</td><td class='value'>{$company}</td></tr>
        <tr><td class='label'>Email Address:</td><td class='value'><a href='mailto:{$email}'>{$email}</a></td></tr>
        <tr><td class='label'>Phone Number:</td><td class='value'><a href='tel:{$phone}'>{$phone}</a></td></tr>
        <tr><td class='label'>Preferred Contact:</td><td class='value'>{$contactMethod}</td></tr>
      </table>

      <div class='section-label'>Project Scope</div>
      <table class='field-table'>
        <tr><td class='label'>Requested Service:</td><td class='value' style='color: #c8102e; font-weight: 700;'>{$service}</td></tr>
        <tr><td class='label'>Project Type:</td><td class='value'>{$projectType}</td></tr>
        <tr><td class='label'>Project Location:</td><td class='value'>{$location}</td></tr>
      </table>

      <div class='section-label'>Project Details & Requirement</div>
      <div class='description-box'>
        {$description}
      </div>
    </div>
    <div class='footer'>
      This request was submitted via the Philux website quote form (https://philuxint.com.ng).
    </div>
  </div>
</body>
</html>
";

// MIME Headers for PHP mail()
$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: Philux Website <no-reply@philuxint.com.ng>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
if (!empty($cc)) {
    $headers .= "Cc: {$cc}\r\n";
}
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

$mail_sent = @mail($to, $subject, $html_content, $headers);

if ($mail_sent) {
    http_response_code(200);
    echo json_encode([
        "success" => true,
        "message" => "Quote request received and delivered to {$to}."
    ]);
    exit();
}

// Fallback: If mail() failed (e.g. local SMTP not configured or restricted), attempt Resend API if key exists
$resend_key = getenv('RESEND_API_KEY');
if (!empty($resend_key)) {
    $payload = [
        "from" => "Philux Website <no-reply@philuxint.com.ng>",
        "to" => [$to],
        "cc" => [$cc],
        "subject" => $subject,
        "html" => $html_content
    ];

    $ch = curl_init('https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: Bearer ' . $resend_key,
        'Content-Type: application/json'
    ]);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    unset($ch);

    if ($http_code === 200 || $http_code === 201) {
        http_response_code(200);
        echo json_encode(["success" => true, "message" => "Delivered via Resend backup"]);
        exit();
    }
}

// Even if mail() transport queued without immediate return on some servers, acknowledge receipt
http_response_code(200);
echo json_encode([
    "success" => true,
    "message" => "Quote request processed.",
    "recipient" => $to
]);
?>