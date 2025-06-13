let user = {
  id: 1,
  name: "Abraham Shiferaw",
  email: "abraham@example.com",
  role: "Admin",
  avatar: "/ai.jpg",
  status: "active",
};

export async function GET() {
  return Response.json(user);
}

export async function PUT(request) {
  const updated = await request.json();

  if (updated.id && updated.id !== user.id) {
    return new Response("ID cannot be changed", { status: 400 });
  }

  user = { ...user, ...updated };
  return Response.json(user);
}