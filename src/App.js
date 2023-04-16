import { useState } from 'react';
import './App.css';
import AutoComplete from './components/AutoComplete/AutoComplete';

const App = () => {
	const data = [
		{ id: 1, name: 'Apple' },
		{ id: 2, name: 'Banana' },
		{ id: 3, name: 'Cherry' },
		{ id: 4, name: 'Durian' },
		{ id: 5, name: 'Elderberry' },
		{ id: 6, name: 'Fig' },
		{ id: 7, name: 'Grape' },
		{ id: 8, name: 'Honeydew' },
		{ id: 9, name: 'Kiwi' },
		{ id: 10, name: 'Lemon' },
		{ id: 11, name: 'Mango' },
		{ id: 12, name: 'Nectarine' },
		{ id: 13, name: 'Orange' },
		{ id: 14, name: 'Pineapple' },
		{ id: 15, name: 'Quince' },
		{ id: 16, name: 'Raspberry' },
		{ id: 17, name: 'Strawberry' },
		{ id: 18, name: 'Tangerine' },
		{ id: 19, name: 'Ugli fruit' },
		{ id: 20, name: 'Watermelon' },
	];

	const [filteredData, setFilteredData] = useState(data);
	const [serachValue, setSearchValue] = useState("");
	  
	return (
		<div className="container">
			<div style={{ width: '100%' }}>
				<div className="card">
					<AutoComplete data={data} setFilteredData={setFilteredData} setSearchValue={setSearchValue} />
				</div>
				<div className='card filteredDataContainer'>
					{serachValue && <p style={{ margin:0 }}>Search Results For: {serachValue}</p>}
					{filteredData.map(row => (
						<div className="row" key={row.id}>
							{row.name}
						</div>
					))}
					{filteredData.length === 0 && <p style={{ margin:0, textAlign: 'center'  }}>Nothing Found...</p>}
				</div>
			</div>
		</div>
	);
}

export default App;
