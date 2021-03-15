module.exports = async (ctx, next) => {
const { id } = ctx.params;
  if (parseInt(ctx.state.user.id,10) === parseInt(id,10) || ctx.state.user.role.type === "admin") {
    // Go to next policy or will reach the controller's action.
    return await next();
  }
  return ctx.unauthorized(`You are not authorized to delete this user`);
};
