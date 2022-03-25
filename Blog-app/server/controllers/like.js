const Like = require('../models/like');
exports.like = async function (req, res) {
	try {
		const { postId, userId } = req.params;
		return Like.create({
			postId,
			userId,
		}).then((like) =>
			res.status(201).send({
				message: `Your have liked the post`,
				like,
			})
		);
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.Like = async function (req, res) {
	try {
		Like.findOne({
			where: { postId: req.params.postId, userId: req.params.userId },
		}).then((like) => {
			if (like !== null) {
				const likeId = like.id;
				return Like.findByPk(likeId)
					.then((like) => {
						return like
							.destroy()
							.then(() =>
								res.status(200).send({
									message:
										'You have unliked the post that you liked before',
								})
							)
							.catch((error) => res.status(400).send(error));
					})
					.catch((error) => res.status(400).send(error));
			} else {
				const { postId, userId } = req.params;
				return Like.create({
					postId,
					userId,
				}).then((like) =>
					res.status(201).send({
						message: `Your have liked the post`,
						like,
					})
				);
			}
		});
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};
exports.getLikeByPostId = async function (request, response) {
	try {
		const likeByPid = await Like.findAll({
			where: { postId: request.params.id },
		});
		response.status(200).json(likeByPid);
	} catch (error) {
		response.status(500).json(error);
	}
};
exports.getLikeByUserId = async function (request, response) {
	try {
		const likeByUserId = await Like.findAll({
			where: { userId: request.params.id },
		});
		response.status(200).json(likeByUserId);
	} catch (error) {
		response.status(500).json(error);
	}
};

exports.unlike = async function (req, res) {
	try {
		return Like.findByPk(req.params.likeId)
			.then((like) => {
				return like
					.destroy()
					.then(() =>
						res.status(200).send({
							message:
								'You have unliked the post that you liked before',
						})
					)
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};
