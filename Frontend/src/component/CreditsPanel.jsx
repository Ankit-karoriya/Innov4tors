import React from "react";
import { listCredits, createCredit, buyCredit } from "../api/credits";
import { me } from "../api/auth";

export default function CreditsPanel() {
	const [credits, setCredits] = React.useState([]);
	const [loading, setLoading] = React.useState(false);
	const [error, setError] = React.useState("");
	const [currentUser, setCurrentUser] = React.useState(null);

	// create form
	const [title, setTitle] = React.useState("");
	const [price, setPrice] = React.useState(0);
	const [quantity, setQuantity] = React.useState(0);

	async function refresh() {
		setLoading(true);
		setError("");
		try {
			const res = await listCredits();
			setCredits(res?.data || []);
		} catch (err) {
			setError("Failed to load credits");
		} finally {
			setLoading(false);
		}
	}

	React.useEffect(() => {
		refresh();
		const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
		if (token) {
			me().then((res) => setCurrentUser(res?.data || null)).catch(() => setCurrentUser(null));
		}
	}, []);

	async function handleCreate(e) {
		e.preventDefault();
		setError("");
		try {
			await createCredit({ title, price: Number(price), quantity: Number(quantity) });
			setTitle("");
			setPrice(0);
			setQuantity(0);
			await refresh();
		} catch (err) {
			setError(err?.response?.data?.message || "Failed to create credit");
		}
	}

	async function handleBuy(id) {
		const qty = Number(prompt("Quantity to buy:", "1"));
		if (!qty || qty <= 0) return;
		setError("");
		try {
			await buyCredit({ id, quantity: qty });
			await refresh();
		} catch (err) {
			setError(err?.response?.data?.message || "Failed to buy");
		}
	}

	return (
		<div className="w-full max-w-4xl mx-auto bg-white/80 backdrop-blur p-4 rounded-xl shadow mt-6">
			<div className="flex items-center justify-between mb-3">
				<h2 className="text-xl font-semibold">Marketplace</h2>
				<button onClick={refresh} className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-lg">Refresh</button>
			</div>
			{error && <p className="text-red-600 mb-2">{error}</p>}
			{currentUser?.role === "seller" && (
				<form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
					<input className="border rounded-lg px-3 py-2" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
					<input className="border rounded-lg px-3 py-2" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
					<input className="border rounded-lg px-3 py-2" type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
					<button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg">Create</button>
				</form>
			)}
			<div className="grid gap-3">
				{loading ? (
					<p>Loading...</p>
				) : (
					credits.map((c) => (
						<div key={c._id} className="border rounded-lg p-3 bg-white flex items-center justify-between">
							<div>
								<p className="font-medium">{c.title}</p>
								<p className="text-sm text-gray-600">Price: {c.price} | Qty: {c.quantity}</p>
								{c.seller && <p className="text-xs text-gray-500">Seller: {c.seller.name}</p>}
							</div>
							{currentUser?.role === "buyer" && (
								<button onClick={() => handleBuy(c._id)} className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded-lg">Buy</button>
							)}
						</div>
					))
				)}
			</div>
		</div>
	);
}


