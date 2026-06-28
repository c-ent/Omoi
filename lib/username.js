import User from "@models/user";

export async function generateUniqueUsername(baseUsername) {
  let username = baseUsername.slice(0, 50);
  let suffix = 0;

  while (await User.findOne({ username })) {
    suffix += 1;
    username = `${baseUsername.slice(0, 50 - String(suffix).length)}${suffix}`;
  }

  return username;
}
