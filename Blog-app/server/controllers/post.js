const Post = require('../models/post');
const User = require('../models/user');

//get post through userid
exports.getPost = async (request, response) => {
	try {
		Post.belongsTo(User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
		User.hasMany(Post, {
			foreignKey: 'userId',
		});
		const post = await Post.findByPk(request.params.id, {
			include: [
				{
					model: User,
					required: true,
					attributes: ['name'],
				},
			],
		});
		response.status(200).json(post);
	} catch (error) {
		response.status(500).json(error);
	}
};
//get posts through category id
exports.getPostbyCategory = async function (request, response) {
	try {
		const postbycategory = await Post.findAll({
			where: { categoryId: request.params.id },
		});
		response.status(200).json(postbycategory);
	} catch (error) {
		response.status(500).json(error);
	}
};

//get all posts
exports.getAll = async function (req, res) {
	try {
		Post.belongsTo(User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
		User.hasMany(Post, {
			foreignKey: 'userId',
		});
		return Post.findAll({
			include: [
				{
					model: User,
					required: true,
					attributes: ['name'],
				},
			],
		}).then((posts) => res.status(200).send(posts));
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.create = async function (req, res) {
	try {
		const picture = req.file.path;
		const { title, description } = req.body;
		const { userId, categoryId } = req.params;
		return Post.create({
			title,
			description,
			picture,
			userId,
			categoryId,
		}).then((post) =>
			res.status(201).send({
				message: `Your post with the title ${title} has been created successfully `,
				post,
			})
		);
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};

exports.update = async function (req, res) {
	try {
		const { title, description } = req.body;

		return Post.findByPk(req.params.postId)
			.then((post) => {
				const postData = { title, description };

				if (req.file) {
					postData.picture = req.file.path;
				}
				console.log('post data', postData);
				post.update(postData)
					.then((updatedPost) => {
						console.log('upated post', updatedPost);
						res.status(200).send({
							message: 'Post updated successfully',
							data: {
								title: updatedPost.title,
								description: updatedPost.description,
								picture: updatedPost.picture,
							},
						});
					})
					.catch((error) => {
						res.status(400).send(error);
						console.log('error message1', error.message);
					});
			})
			.catch((error) => {
				res.status(400).send(error);
				console.log('error message2', error.message);
			});
	} catch (e) {
		console.log('error message', e.message);
		return res.status(400).json({ status: 400, message: e.message });
	}
};
exports.delete = async function (req, res) {
	try {
		return Post.findByPk(req.params.postId)
			.then((post) => {
				if (!post) {
					return res.status(400).send({
						message: 'Post Not Found.',
					});
				}
				return post
					.destroy()
					.then(() =>
						res.status(200).send({
							message: 'Post successfully deleted',
						})
					)
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	} catch (e) {
		return res.status(400).json({ status: 400, message: e.message });
	}
};
