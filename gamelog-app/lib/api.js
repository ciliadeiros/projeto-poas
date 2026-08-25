const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  constructor(message, status, detail) {
    super(message);
    this.status = status;
    this.detail = detail;
  }
}

/**
 * Wrapper genérico de fetch pro backend.
 * - Junta a base URL (NEXT_PUBLIC_API_URL) com o path.
 * - Se `token` for passado, manda o header Authorization: Bearer <token>
 *   (é assim que o back-end (app/core/dependencies_auth.py) espera).
 * - Se a resposta não for OK, lança ApiError com a mensagem que o FastAPI
 *   manda em `detail` (ex.: "Email ou senha inválidos").
 */
async function request(path, { method = "GET", body, token, isForm = false } = {}) {
  const headers = {};
  if (!isForm) headers["Content-Type"] = "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? (isForm ? body : JSON.stringify(body)) : undefined,
  });

  const isJson = res.headers.get("content-type")?.includes("application/json");
  const data = isJson ? await res.json().catch(() => null) : null;

  if (!res.ok) {
    const detail = data?.detail || res.statusText;
    throw new ApiError(
      typeof detail === "string" ? detail : "Erro na requisição",
      res.status,
      detail
    );
  }

  return data;
}

// ---------- Auth ----------
// POST /auth/register espera JSON com esses campos (app/schemas/user.py)
export function registerUser({ nomeCompleto, nomeUsuario, email, senha }) {
  return request("/auth/register", {
    method: "POST",
    body: {
      usr_nome_usuario: nomeUsuario,
      usr_nome_completo: nomeCompleto,
      usr_email: email,
      usr_senha: senha,
    },
  });
}

// POST /auth/login usa OAuth2PasswordRequestForm: espera
// application/x-www-form-urlencoded com "username" e "password"
// (username = e-mail, é o que o back-end usa pra autenticar)
export function loginUser({ email, senha }) {
  const body = new URLSearchParams();
  body.set("username", email);
  body.set("password", senha);

  return request("/auth/login", {
    method: "POST",
    body,
    isForm: true,
  });
}

export function getMe(token) {
  return request("/auth/me", { token });
}

// ---------- Games ----------
export function listGames() {
  return request("/games/");
}

export function getGame(id) {
  return request(`/games/${id}`);
}

export function searchRawg({ nome, page = 1, pageSize = 10 }) {
  const params = new URLSearchParams({
    nome,
    page: String(page),
    page_size: String(pageSize),
  });
  return request(`/games/rawg/search?${params}`);
}

// ---------- Library (biblioteca do usuário logado) ----------
export function listLibrary(token) {
  return request("/library/", { token });
}

export function addToLibrary(token, dados) {
  return request("/library/", { method: "POST", body: dados, token });
}

export function updateLibraryEntry(token, id, dados) {
  return request(`/library/${id}`, { method: "PUT", body: dados, token });
}

export function removeFromLibrary(token, id) {
  return request(`/library/${id}`, { method: "DELETE", token });
}
