import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Table, Row, Col, Button } from "react-bootstrap";
import pokemon from "./pokemon.json";

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
							<tr key={idx + key}>
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
	const [selectedItem, setSelectedItem] = useState(null);

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
								<td colSpan={2}>Not Found</td>
							</tr>
						)}
					</tbody>
				</Table>
				{selectedItem && (
					<>
						<PokemonInfo {...selectedItem} />
					</>
				)}
			</Container>
		</>
	);
}

export default App;
