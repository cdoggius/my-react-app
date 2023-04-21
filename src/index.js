import { useState } from 'react';
import React from 'react';
import ReactDOM from 'react-dom/client';

function Product(name,desc,cost,stock) {
	this.name = name;
	this.description = desc;
	this.price = cost;
	this.qty = stock;
	}

const soda1 = new Product("soda","Soda",".95",3);
const candy_bar1 = new Product("candy_bar","Candy Bar",".60",3);
const chips1 = new Product("chips","Chips",".99",3);

function MyForm() {
	
  const [inputs, setInputs] = useState({});

  const myCart = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const handleSubmit = (event) => {
    event.preventDefault();
	
	const soda = inputs.soda
	const candy_bar = inputs.candy_bar
	const chips = inputs.chips
	
	
	let cartText = ""
	let transText = ""
	let total1 = ""
	let total2 = ""
	let total3 = ""
	
	if (soda) {	
		if ( soda > soda1.qty && soda1.qty != 0 ) { alert("Not enough sodas in stock. Please lower order below "+soda1.qty); }
		else {
			if ( soda1.qty > 0 ) {
				soda1.qty-=soda;
				transText+= soda+" sodas/";
				console.log("Ordered: "+soda+" sodas.") ;
				cartText+= "Ordered: "+soda+" sodas.<br>";
				total1=(soda*soda1.price);
				}
			else { alert("No more sodas in stock!"); }
			}
		}
		
	if (candy_bar) { 
		if ( candy_bar > candy_bar1.qty && candy_bar1.qty != 0 ) { alert("Not enough candy bars in stock. Please lower order below "+candy_bar1.qty); }
		else {
			if ( candy_bar1.qty > 0 ) {
				candy_bar1.qty-=candy_bar;
				transText+= candy_bar+" candy bars/";
				console.log("Ordered: "+candy_bar+" candy bars.");
				cartText += "Ordered: "+candy_bar+" candy bars.<br>";
				total2=(candy_bar*candy_bar1.price);
				} 
			else { alert("No more candy bars in stock!"); }
			}
		}
		
	if (chips) { 
		if ( chips > chips1.qty && chips1.qty != 0 ) { alert("Not enough chips in stock. Please lower order below "+chips1.qty); }
		else {		
			if ( chips1.qty > 0 ) {
				chips1.qty-=chips;
				transText+= chips+" chips/";
				console.log("Ordered: "+chips+" chips.");
				cartText += "Ordered: "+chips+" chips.<br>";
				total3=(chips*chips1.price);
				}
		else { alert("No more chips in stock!"); }
		}
	}

    let total=((+total1)+(+total2)+(+total3)).toFixed(2);
		
	var cartDisplay = document.getElementById('cartDisplay')
	cartText+="<br />Total: $"+total;
	cartDisplay.innerHTML=cartText;
	
	document.getElementById('stockDisplay').innerHTML=soda1.qty+" sodas remaining in stock.<br>";
	document.getElementById('stockDisplay').innerHTML+=candy_bar1.qty+" candy bars remaining in stock.<br>";
	document.getElementById('stockDisplay').innerHTML+=chips1.qty+" chips remaining in stock.<br>";	


	if ( transText ) {
		let date = new Date().toJSON();
		transText+=total;
		document.getElementById('transDisplay').innerHTML+=date+": "+transText+"<br />";
		}
    

	if ( chips1.qty == 0 && soda1.qty == 0 && candy_bar1.qty == 0 ) { document.getElementById('mySubmit').disabled = true } 

	inputs.soda = ""
	inputs.candy_bar = ""
	inputs.chips = ""
	document.getElementById('sodaField').value=""
	document.getElementById('candy_barField').value=""
	document.getElementById('chipsField').value=""

	console.log(inputs)
  }
  
  return (
  
    <form onSubmit={handleSubmit}>
	  <center>
	  <h1>Vending Machine</h1>

<table border="0">
	<tr>
		<td>Product</td><td>Quantity</td><td>&nbsp;</td><td>Price</td>
	</tr>
	<tr><td colspan="4"><hr /></td></tr>
	<tr>
		<td>Soda</td>
		<td><input id="sodaField" name="soda" type="number" min="1" value={inputs.soda || ""} onChange={myCart}/></td><td>&nbsp;</td><td>${soda1.price}</td>
    </tr>
	<tr>
		<td>Candy Bar</td>
		<td><input id="candy_barField" name="candy_bar" type="number" min="1" value={inputs.candy_bar || ""} onChange={myCart}/></td><td>&nbsp;</td><td>${candy_bar1.price}</td>
    </tr>
	<tr>
		<td>Chips</td>
		<td><input id="chipsField" name="chips" type="number" min="1" value={inputs.chips || ""} onChange={myCart}/></td><td>&nbsp;</td><td>${chips1.price}</td>
	</tr>
	<tr>
		<td><br /><input id="mySubmit" type="submit" value="Purchase" /></td>
	</tr>
</table>

	  <br /><br /><br /><br />
	  
	  <h3>Current Purchase</h3>
	  <hr />
	  <p id="cartDisplay"></p>
	  <hr />
	  
	  <h3>Stock</h3>
	  <hr />
	  <p id="stockDisplay"></p>
	  <hr />

	  <h3>Transactions</h3>
	  <hr />
	  <p id="transDisplay"></p>
	  <hr />
	  
      </center>

    </form>

  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyForm />);






