import React, { useState, useEffect } from 'react';
import { MessageSquare, CornerDownRight, Loader, ChevronLeft, ChevronRight } from 'lucide-react';
import { getComments, submitComment } from '../services/wp-api';
import { Button } from './ui/Button';

export const CommentSection = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [content, setContent] = useState('');
    const [replyTo, setReplyTo] = useState(null); // stores { id, author_name }
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    // Pagination State (Prevents page from stretching infinitely with many comments)
    const [currentPage, setCurrentPage] = useState(1);
    const commentsPerPage = 5;

    useEffect(() => {
        getComments(postId).then(data => {
            setComments(data);
            setIsLoading(false);
        }).catch(err => {
            console.error("Comments error:", err);
            setIsLoading(false);
        });
    }, [postId]);

    // Root comments (top-level threads)
    const rootComments = comments.filter(c => {
        return !c.parentId || c.parentId === 0 || c.parentId === '0' || c.parentId === null;
    });

    const totalPages = Math.max(1, Math.ceil(rootComments.length / commentsPerPage));

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(Math.max(1, totalPages));
        }
    }, [totalPages, currentPage]);

    const paginatedRoots = rootComments.slice((currentPage - 1) * commentsPerPage, currentPage * commentsPerPage);

    const handleCommentPageChange = (pageNum) => {
        if (pageNum < 1 || pageNum > totalPages) return;
        setCurrentPage(pageNum);
        const headerEl = document.getElementById('comments-discussion-header');
        if (headerEl) {
            headerEl.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false);
        setSubmitMessage('');

        try {
            const parentId = replyTo ? replyTo.id : 0;
            const newComment = await submitComment(postId, name, email, content, parentId);

            // Optimistically update UI so user immediately sees their comment
            setComments(prev => [...prev, newComment]);
            setName('');
            setEmail('');
            setContent('');
            setReplyTo(null);
            setSubmitSuccess(true);
            setSubmitMessage(
                newComment.isPending
                    ? "Thank you! Your comment was received and will appear once approved by admin."
                    : "Comment successfully posted!"
            );

            // If a root comment was submitted, reset to page 1 so user immediately sees it
            if (!parentId) {
                setCurrentPage(1);
            }

            // Fetch latest persisted comments from WordPress backend
            setTimeout(() => {
                getComments(postId).then(data => {
                    if (data && data.length > 0) setComments(data);
                }).catch(console.error);
            }, 1200);

            // Clear success message after delay
            setTimeout(() => setSubmitSuccess(false), 6000);
        } catch (error) {
            console.error('Submit comment error:', error);
            alert(error.message || "Failed to post comment. Ensure the network is connected or WordPress allows comments in Settings.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- RECURSIVE THREADING (Paginated by top-level roots) ---
    const renderComments = (parentId = null, depth = 0) => {
        const list = parentId === null
            ? paginatedRoots
            : comments.filter(c => String(c.parentId) === String(parentId));

        if (list.length === 0) return null;

        return (
            <div className={`comment-tier ${depth > 0 ? "comment-nested" : ""}`}>
                {list.map(comment => (
                    <div key={comment.id} className="comment-block">
                        <div className="comment-head">
                            <span className="comment-author">{comment.author_name}</span>
                            <span className="comment-date">{comment.date}</span>
                        </div>
                        <p className="comment-body" dangerouslySetInnerHTML={{ __html: comment.content }}></p>

                        {/* Inline Reply Trigger */}
                        {depth < 3 && (
                            <button
                                type="button"
                                onClick={() => {
                                    setReplyTo({ id: comment.id, author_name: comment.author_name });
                                    document.getElementById('comment-form')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="comment-reply-trigger"
                            >
                                <CornerDownRight size={14} /> Reply
                            </button>
                        )}

                        {/* Recursively generate children nested underneath */}
                        {renderComments(comment.id, depth + 1)}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="comment-section">
            <h3 id="comments-discussion-header" className="comment-section-header">
                <MessageSquare size={28} className="icon-red" /> Discussion ({comments.length})
            </h3>

            {isLoading ? (
                <div className="comment-loader-wrapper">
                    <Loader className="spinner icon-red" size={32} />
                </div>
            ) : (
                <div className="comment-thread-container">
                    {comments.length === 0 ? (
                        <p className="comment-empty">There are no comments on this post yet. Be the first to share your thoughts!</p>
                    ) : (
                        <>
                            {renderComments(null, 0)}

                            {/* Comment Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="comment-pagination">
                                    <span className="comment-pagination-info">
                                        Page {currentPage} of {totalPages} &bull; ({comments.length} total {comments.length === 1 ? 'comment' : 'comments'})
                                    </span>
                                    <div className="comment-pagination-controls">
                                        <button
                                            type="button"
                                            className="comment-page-btn"
                                            onClick={() => handleCommentPageChange(currentPage - 1)}
                                            disabled={currentPage === 1}
                                            aria-label="Previous Comments Page"
                                        >
                                            <ChevronLeft size={16} />
                                        </button>
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                                            <button
                                                key={pageNum}
                                                type="button"
                                                className={`comment-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                                                onClick={() => handleCommentPageChange(pageNum)}
                                            >
                                                {pageNum}
                                            </button>
                                        ))}
                                        <button
                                            type="button"
                                            className="comment-page-btn"
                                            onClick={() => handleCommentPageChange(currentPage + 1)}
                                            disabled={currentPage === totalPages}
                                            aria-label="Next Comments Page"
                                        >
                                            <ChevronRight size={16} />
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}

            {/* Application Comment Form */}
            <div id="comment-form" className="comment-form-container">
                <h4 className="comment-form-header">Leave a Reply</h4>
                {replyTo ? (
                    <div className="comment-reply-context">
                        <span className="reply-text">
                            Replying to <strong>{replyTo.author_name}</strong>
                        </span>
                        <button onClick={() => setReplyTo(null)} className="reply-cancel">Cancel Reply</button>
                    </div>
                ) : (
                    <p className="comment-form-note">Your email address will not be published. Required fields are marked *</p>
                )}

                <form onSubmit={handleCommentSubmit} className="comment-grid">
                    <div className="form-group full-width">
                        <label>Comment *</label>
                        <textarea
                            required
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Write your insightful thought here..."
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label>Name *</label>
                        <input
                            required
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your Name"
                        />
                    </div>
                    <div className="form-group">
                        <label>Email *</label>
                        <input
                            required
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="hello@example.com"
                        />
                    </div>
                    <div className="form-group full-width form-actions">
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Posting...' : 'Post Comment'}
                        </Button>
                        {submitSuccess && (
                            <span className="submit-success">{submitMessage || "Comment successfully posted!"}</span>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};
