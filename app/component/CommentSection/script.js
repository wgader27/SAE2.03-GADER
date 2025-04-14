let templateFile = await fetch('./component/CommentSection/template.html');
let template = await templateFile.text();

let CommentSection = {};

CommentSection.format = function(comments, movieId) {
    let html = template;
    html = html.replace('{{movieId}}', movieId);
    
    const commentsList = comments.length === 0 
        ? '<p class="no-comments">Soyez le premier à commenter ce film !</p>'
        : comments.map(comment => CommentSection.formatComment(comment)).join('');
    
    html = html.replace('{{commentsList}}', commentsList);
    return html;
};

CommentSection.formatComment = function(comment) {
    return `
        <div class="comment">
            <img src="../server/images/${comment.user_image || 'default.jpg'}" 
                 alt="${comment.user_name}" 
                 class="comment-avatar">
            <div class="comment-content">
                <div class="comment-header">
                    <span class="comment-author">${comment.user_name}</span>
                    <span class="comment-date">${new Date(comment.created_at).toLocaleString()}</span>
                </div>
                <p class="comment-text">${comment.content}</p>
            </div>
        </div>
    `;
};

export { CommentSection };