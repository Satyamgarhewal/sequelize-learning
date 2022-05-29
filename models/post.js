"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      //one to many relation with User on userId works as a foreign key
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }

    toJSON() {
      return { ...this.get(), id: undefined, userId: undefined };
    }
  }
  Post.init(
    {
      body: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "posts",
      modelName: "Post",
    }
  );
  return Post;
};
