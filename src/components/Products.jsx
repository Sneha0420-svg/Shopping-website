import React, { useEffect, useState  } from 'react'
import { Box ,Grid, Snackbar, Typography} from "@mui/material"
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


const options = [ "clothes","Accessories","Shoes","Toys"];


export const Products = () => {
  const [error,setError]=useState("")
  const [products,setProducts]=useState([])
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');
  const [category,setCategory]=useState("")
  const [cart,setCart]=useState([])
  const [message,setMessage]=useState("")
  const [snackbarOpen,setSnackbarOpen]=useState(false)
 

 
  const fetchdresses=async ()=>{

    try{
      
      const response=await axios.get("http://localhost:3000/products")
      
     if (category ) {
      setProducts(response.data.filter(item => item.category.toLowerCase() === category.toLowerCase()));
    } else {
      setProducts(response.data);
    }
    }
    catch(err){
       setError(err.message)
    }
  }
  useEffect(()=>{
     fetchdresses()

  },[products,category])

  const handle_click=async (products)=>{
    try{
      await axios.post("http://localhost:3000/cart",
        products
      )
      setCart((prevCart) => [...prevCart, products])
      setMessage("Item Added successfully 👍")
      setSnackbarOpen(true)
    }
    catch(err){
      setError("failed to add items ")
      setSnackbarOpen(true)

    }
  
  }
  
  return (
   <>
   <Box sx={{height:"auto"}}>
    <Grid container sx={{height:"60px"}}></Grid>
     <Snackbar
     open={snackbarOpen}
     autoHideDuration={3000}
     onClose={() => setSnackbarOpen(false)}
     message={message}
     />
    <Grid container>
      <Grid item lg={3} md={4} sm={12} xs={12} sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div >
      
      <Autocomplete
        
        onChange={(event, newValue) => {
          setValue(newValue);
          setCategory(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        id="controllable-states-demo"
        options={options}
        sx={{ width: 300 ,backgroundColor:"rgb(249, 224, 252)"}}
        renderInput={(params) => <TextField {...params} label="CATEGORIES(FOR KIDS ONLY)" color="secondary" />}
         
      />
    </div>
      </Grid>
      <Grid item lg={9} md={8} sm={12} xs={12}  
      sx={{
        height:"100px",
       
        textAlign:"center"
       
       
      }}><Typography variant='h3' sx={{fontFamily:"Brush Script MT",mt:4}}><b>OUR PRODUCTS</b></Typography></Grid>
      
    </Grid >
    <Grid item sx={{display:"flex",flexWrap:"wrap",justifyContent:"center"}}>
    {products.map((data)=>(
      
       <Card sx={{width:{ xs: "90%", sm: "80%", md: "90%", lg: "100%" },maxWidth: 400 ,m:5}}>
       <CardActionArea>
         <CardMedia
           component="img"
           height="400"
          
           image={data.image_url}
           alt="green iguana"
           sx={{
            object:"contain"
           }}
         />
         <CardContent>
         <Typography gutterBottom  component="div">
            {data.category}
           </Typography>
           <Typography gutterBottom variant="h5" component="div">
            {data.name}
           </Typography>
           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
             {data.description}
           </Typography>
           <Typography gutterBottom variant="h5" component="div" sx={{color:"Green"}}>
           ${data.price1}
          </Typography>
          <Typography gutterBottom  component="div" >
           <span style={{textDecoration:"line-through",color:"GrayText"}}>${data.price}</span>
           <span style={{color:"brown"}}>{
           ` (${Math.floor(((data.price-data.price1)/data.price)*100)}% off)
           `}</span>
          </Typography>

         </CardContent>
       </CardActionArea>
       <CardActions>
         <Button size="small" color="primary" onClick={()=>handle_click(data)} >
           Add to Cart
         </Button>
       </CardActions>
     </Card>
     
    ))}
    

    </Grid>
   </Box>
 
   </>
  )
}
