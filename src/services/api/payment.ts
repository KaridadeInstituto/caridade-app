import axios from "axios";

const criarPagamento = async (dados : unknown ) => {
    try {
        const response = await axios.post("https://app.ghostspay.com/api/v1/transaction.purchase" , dados , {
            headers: {
                "Authorization": "Bearer " + process.env.GHOSTSPAY_API_KEY || "f0554d58-abd8-4ae0-8557-1a7718e0f6fa",  
                "Content-Type": "application/json",
            }
       })
       console.log(response.data);
    } catch ( error ) {
        console.log(error);
    }
}


export { criarPagamento }; 