const data = fetch('http://localhost:5000/api/v1/items').
            then((res)=>res.json()).
            then((data)=>console.log(data))