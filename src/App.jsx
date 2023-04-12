import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Table, Row, Col, Button, Stack } from "react-bootstrap";
const PokemonRow = ({ pokemon, onSelect }) => {
	// console.log(pokemon);
	return (
		<>
			<tr>
				<td>{pokemon.name.english}</td>
				<td>{pokemon.type.join(", ")}</td>
				<td>
					<Button onClick={() => onSelect(pokemon)}>Select!</Button>
				</td>
			</tr>
		</>
	);
};

const PokemonInfo = ({ name, base }) => (
	<>
		<div>
			<h1>{name.english}</h1>
			<Table>
				<thead>
					<tr>
						<td></td>
						<td></td>
					</tr>
				</thead>
				<tbody>
					{Object.keys(base).map((key, idx) => (
						<>
							<tr key={key}>
								<td>{key}</td>
								<td>{base[key]}</td>
							</tr>
						</>
					))}
				</tbody>
			</Table>
		</div>
	</>
);

PokemonRow.propTypes = {
	pokemon: PropTypes.shape({
		name: PropTypes.shape({ english: PropTypes.string.isRequired }),
		type: PropTypes.arrayOf(PropTypes.string.isRequired),
	}),
	onSelect: PropTypes.func.isRequired,
};

PokemonInfo.propTypes = {
	name: PropTypes.shape({ english: PropTypes.string.isRequired }),
	base: PropTypes.shape({
		HP: PropTypes.number.isRequired,
		Attack: PropTypes.number.isRequired,
		Defense: PropTypes.number.isRequired,
		"Sp. Attack": PropTypes.number.isRequired,
		"Sp. Defense": PropTypes.number.isRequired,
		Speed: PropTypes.number.isRequired,
	}),
};
function App() {
	const [filter, setFilter] = useState("");
	const [pokemon, setPokemon] = useState([]);
	const [selectedItem, setSelectedItem] = useState(null);

	useEffect(() => {
		fetch("http://localhost:5173/src/pokemon.json")
			.then((res) => res.json())
			.then((data) => setPokemon(data))
			.catch((e) => {
				console.log(e);
				return setPokemon(null);
			});
	}, []);
	return (
		<>
			<Container className="my-5">
				<h1 className="fw-bold text-center">Pokemon Search</h1>

				<input
					className="form-control"
					type="text"
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
				<Stack direction="horizontal" gap={3}>
					<div className="container align-self-start">
						{selectedItem ? (
							<>
								<PokemonInfo {...selectedItem} />
							</>
						) : (
							<>
								<div></div>
							</>
						)}
					</div>
					<Table>
						<thead>
							<tr>
								<th>Name</th>
								<th>Type</th>
								<th>Select</th>
							</tr>
						</thead>
						<tbody>
							{pokemon ? (
								pokemon
									.filter((pokemon) =>
										pokemon.name.english
											.toLowerCase()
											.includes(filter.toLowerCase())
									)
									.slice(0, 20)
									.map((pokemon) => (
										<PokemonRow
											pokemon={pokemon}
											onSelect={(pokemon) => setSelectedItem(pokemon)}
											key={pokemon.id}
										/>
									))
							) : (
								<tr>
									<td className="text-center fs-3 fw-bold" colSpan={3}>
										Not Found
									</td>
								</tr>
							)}
						</tbody>
					</Table>
				</Stack>
			</Container>
		</>
	);
}

export default App;
