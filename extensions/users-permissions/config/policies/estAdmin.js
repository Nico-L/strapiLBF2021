module.exports = async (ctx, next) => {
  if (ctx.state.user.role.type === "admin") {
    // Go to next policy or will reach the controller's action.
    return await next();
  }
  return ctx.unauthorized(`You are not authorized to modify this user`);
};
