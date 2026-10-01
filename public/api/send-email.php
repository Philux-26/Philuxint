<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["error" => "Method not allowed"]);
    exit();
}

// Read JSON Payload from QuoteForm.jsx
$json = file_get_contents('php://input');
$data = json_decode($json, true);

$name = $data['name'] ?? '';
$company = $data['company'] ?? 'N/A';
$email = $data['email'] ?? '';
$phone = $data['phone'] ?? '';
$service = $data['service'] ?? '';
$location = $data['location'] ?? '';
$projectType = $data['projectType'] ?? '';
$description = $data['description'] ?? '';
$contactMethod = $data['contactMethod'] ?? '';

if (empty($name) || empty($email) || empty($service) || empty($description)) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit();
}

// ==========================================
// CONFIGURATION
// ==========================================
// Set your Resend API Key here if not using server environment variables
$resend_api_key = getenv('re_4asLihLw_H7wqXSr7mL8WF9n9mwUr1FfW') ?: 're_4asLihLw_H7wqXSr7mL8WF9n9mwUr1FfW';

$html_content = "
<div style='font-family: Arial, sans-serif; padding: 20px; max-width: 600px;'>
    <h2 style='color: #c8102e;'>New Quote Request from Philux Website</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Company:</strong> {$company}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Phone:</strong> {$phone}</p>
    <hr />
    <h3 style='color: #333;'>Project Details</h3>
    <p><strong>Service:</strong> {$service}</p>
    <p><strong>Location:</strong> {$location}</p>
    <p><strong>Project Type:</strong> {$projectType}</p>
    <hr />
    <h3 style='color: #333;'>Message & Preferences</h3>
    <p><strong>Description:</strong><br /> {$description}</p>
    <p><strong>Preferred Contact Method:</strong> {$contactMethod}</p>
</div>
";

$payload = [
    "from" => "Philux Website <onboarding@resend.dev>", // Update domain (e.g. no-reply@philuxint.com.ng)
    "to" => ["realtundeonline@gmail.com"],
    "cc" => ["official.ojebisibabatunde@gmail.com"],
    "subject" => "New Project Quote Request: {$service} from {$name}",
    "html" => $html_content
];

$ch = curl_init('https://api.resend.com/emails');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $resend_api_key,
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curl_error = curl_error($ch);
// curl_close is deprecated in PHP 8.5+; the CurlHandle object is garbage collected automatically
unset($ch);

if ($http_code === 200 || $http_code === 201) {
    echo json_encode(["success" => true, "response" => json_decode($response)]);
} else {
    http_response_code($http_code);
    echo json_encode([
        "error" => "Failed to send email",
        "details" => $response,
        "curl_msg" => $curl_error
    ]);
}
?>