import React from "react";
import { register, login, me, logout } from "../api/auth";

export default function AuthPanel() {
	const [name, setName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [role, setRole] = React.useState("buyer");
	const [currentUser, setCurrentUser] = React.useState(null);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");

	React.useEffect(() => {
		const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
		if (token) {
			me().then((res) => setCurrentUser(res?.data || null)).catch(() => setCurrentUser(null));
		}
	}, []);

	async function handleRegister(e) {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await register({ name, email, password, role });
			const res = await me();
			setCurrentUser(res?.data || null);
		} catch (err) {
			setError(err?.response?.data?.message || "Registration failed");
		} finally {
			setLoading(false);
		}
	}

	async function handleLogin(e) {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			await login({ email, password });
			const res = await me();
			setCurrentUser(res?.data || null);
		} catch (err) {
			setError(err?.response?.data?.message || "Login failed");
		} finally {
			setLoading(false);
		}
	}

	function handleLogout() {
		logout();
		setCurrentUser(null);
	}

	return (
		<div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur p-4 rounded-xl shadow mt-8">
			<h2 className="text-xl font-semibold mb-3">Authentication</h2>
			{currentUser ? (
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm text-gray-700">Logged in as</p>
						<p className="font-medium">{currentUser.name} ({currentUser.email}) - {currentUser.role}</p>
					</div>
					<button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">Logout</button>
				</div>
			) : (
				<form className="grid grid-cols-1 md:grid-cols-2 gap-3" onSubmit={handleLogin}>
					<input className="border rounded-lg px-3 py-2" placeholder="Name (for register)" value={name} onChange={(e) => setName(e.target.value)} />
					<select className="border rounded-lg px-3 py-2" value={role} onChange={(e) => setRole(e.target.value)}>
						<option value="buyer">Buyer</option>
						<option value="seller">Seller</option>
					</select>
					<input className="border rounded-lg px-3 py-2 md:col-span-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
					<input className="border rounded-lg px-3 py-2 md:col-span-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
					<div className="flex gap-3 md:col-span-2">
						<button type="button" onClick={handleRegister} disabled={loading} className="bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 rounded-lg">
							{loading ? "..." : "Register"}
						</button>
						<button type="submit" disabled={loading} className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg">
							{loading ? "..." : "Login"}
						</button>
					</div>
					{error && <p className="text-red-600 md:col-span-2">{error}</p>}
				</form>
			)}
		</div>
	);
}


