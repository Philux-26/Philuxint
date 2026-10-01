import React, { useState, useEffect } from 'react';
import { MessageSquare, CornerDownRight, Loader } from 'lucide-react';
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

    useEffect(() => {
        getComments(postId).then(data => {
            setComments(data);
            setIsLoading(false);
        }).catch(err => {
            console.error("Comments error:", err);
            setIsLoading(false);
        });
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitSuccess(false);

        try {
            const parentId = replyTo ? replyTo.id : 0;
            const newComment = await submitComment(postId, name, email, content, parentId);

            // Optimistically update UI
            setComments(prev => [...prev, newComment]);
            setName('');
            setEmail('');
            setContent('');
            setReplyTo(null);
            setSubmitSuccess(true);

            // Clear success message after delay
            setTimeout(() => setSubmitSuccess(false), 4000);
        } catch (error) {
            console.error('Submit comment error', error);
            alert("Failed to post comment. Ensure the network is connected or WP API allows anonymous comments in Settings.");
        } finally {
            setIsSubmitting(false);
        }
    };

    // --- RECURSIVE THREADING ---
    const renderComments = (parentId = null, depth = 0) => {
        const filtered = comments.filter(c => c.parentId === parentId);
        if (filtered.length === 0) return null;

        return (
            <div className={`comment-tier ${depth > 0 ? "comment-nested" : ""}`}>
                {filtered.map(comment => (
                    <div key={comment.id} className="comment-block">
                        <div className="comment-head">
                            <span className="comment-author">{comment.author_name}</span>
                            <span className="comment-date">{comment.date}</span>
                        </div>
                        <p className="comment-body" dangerouslySetInnerHTML={{ __html: comment.content }}></p>

                        {/* Inline Reply Trigger */}
                        {depth < 3 && (
                            <button
                                onClick={() => {
                                    setReplyTo({ id: comment.id, author_name: comment.author_name });
                                    document.getElementById('comment-form').scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="comment-reply-trigger"
                            >
                                <CornerDownRight size={14} /> Reply
                            </button>
                        )}

                        {/* Recursively generate children */}
                        {renderComments(comment.id, depth + 1)}
                    </div>
                ))}
            </div>
        );
    };

    return (
        <section className="comment-section">
            <h3 className="comment-section-header">
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
                        renderComments(null, 0)
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
                            <span className="submit-success">Comment successfully posted!</span>
                        )}
                    </div>
                </form>
            </div>
        </section>
    );
};
