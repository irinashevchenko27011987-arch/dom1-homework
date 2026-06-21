import commentsData from "./comments.js";
import { renderComments } from "./renderComments.js";
import { handleLikes } from "./handleLikes.js";
import { handleQuotes } from "./handleQuotes.js";
import { handleAddComment } from "./handleAddComment.js";

renderComments(commentsData);

handleLikes(commentsData, renderComments);
handleQuotes(commentsData);
handleAddComment(commentsData, renderComments);
