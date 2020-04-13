const BaseService = require("./base.service");
let _commentRepository,
  _ideaRepository = null;

class CommentService extends BaseService {
  constructor({ CommentRepository, IdeaRepository }) {
    super(CommentRepository);
    _ideaRepository = IdeaRepository;
    _commentRepository = CommentRepository;
  }

  async getIdeaComments(ideaId) {
    if (!ideaId) {
      const error = new Error();
      error.status = 400;
      error.message = "ideaId must be sent";
      throw error;
    }

    idea = await _ideaRepository.get(ideaId);

    if (!idea) {
      const error = new Error();
      error.status = 400;
      error.message = "idea doesnt found";
      throw error;
    }
    const { comments } = idea;
    return comments;
  }

  async createComment(comment, ideaId) {
    if (!ideaId) {
      const error = new Error();
      error.status = 400;
      error.message = "ideaId must be sent";
      throw error;
    }

    idea = await _ideaRepository.get(ideaId);

    if (!idea) {
      const error = new Error();
      error.status = 400;
      error.message = "idea doesnt found";
      throw error;
    }

    createdComment = await _commentRepository.create(comment);
    idea.comments.push(createComment);

    return await _ideaRepository.update(ideaId, { comments: idea.comments });
  }
}

module.exports = CommentService;
