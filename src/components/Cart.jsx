import { Box, Grid, Stack, Typography,Snackbar } from '@mui/material'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
export const Cart = () => {

  const [cart,setCart]=useState([])
 const [count,setCount]=useState({})
 const [message,setMessage]=useState("")
 const [error,setError]=useState("")
 const [snackbarOpen,setSnackbarOpen]=useState(false)
 

  const fetchCartitems=async ()=>{

    try{
      const res=await axios.get("http://localhost:3000/cart")
      setCart(res.data)
    }
    catch(err){
      console.log(err.message)
    }
  }

  const handledelete=async (id)=>{
    try{
      await axios.delete(`http://localhost:3000/cart/${id}`)
      setCart(cart.filter(item => item.id !== id));  // ✅ Update the cart immediately
      setMessage("items deleted successfully ")
      setSnackbarOpen(true)
    }
    catch(err){
      setError("failed to delete")
      setSnackbarOpen(true)
    }
  }

  const handleadd=(id)=>{
    setCount(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }))
  }

  const handlesub=(id)=>{
    setCount(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) - 1) }))
  }
    useEffect(()=>{
    fetchCartitems()
  },[])
  
  return (
   <Box>
    <Grid container  sx={{height:"100px"}}></Grid>
    <Snackbar
             open={snackbarOpen}
             autoHideDuration={3000}
             onClose={() => setSnackbarOpen(false)}
             message={message || error}
             />
             {
             cart.length==0?(
              <Grid container justifyContent="center" sx={{mt:5}} >
         
          <img src="https://eei.edu/wp-content/uploads/2017/03/cart-empty.png" alt="not" />
        </Grid>
             ):(
<Grid container sx={{display:"flex",justifyContent:"center"}}>
        {cart.map((data)=>(
          <Grid key={data.id} item lg={8} md={8} sm={10} xs={12} sx={{height:"auto",display:"flex",justifyContent:"space-between",mb:2
          ,sm:{justifyContent:"center"}}}>
            <Grid container>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{height:"300px"}}>
            <img src={data.image_url} alt={data.name} style={{height:"300px",borderRadius:"30px"}}/>
          </Grid>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{height:"250px",backgroundColor:"rgb(249, 224, 252)",borderRadius:"30px"}}>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{height:"80px",textAlign:"center"}}>
              <Typography variant='h4'>{data.name}</Typography>
            </Grid>
           <Grid container sx={{display:"flex",flexWrap:"nowrap"}}>
             <Grid item  lg={6} md={6} sm={6} xs={6} sx={{height:"80px",ml:2}}>
                      <Typography gutterBottom variant="h5" component="div" sx={{color:"Green"}}>
                    
                    ${((count[data.id] || 1)*data.price1).toFixed(2)}
                      </Typography>
                     <Typography gutterBottom  component="div" >
                       <span style={{textDecoration:"line-through",color:"GrayText"}}>${data.price}</span>
                       <span style={{color:"brown"}}>{
                       ` (${Math.floor(((data.price-data.price1)/data.price)*100)}% off)
                       `}</span>
                      </Typography>

            
              </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}  sx={{height:"80px",textAlign:"center"}}>
                  <Fab size="small" color="secondary" aria-label="add" sx={{mr:2}} onClick={()=>handleadd(data.id)}>
                     <AddIcon />
                    </Fab>
                    {count[data.id] || 1}
                  <Fab size="small" color="secondary" aria-label="add" sx={{ml:2}} onClick={()=>handlesub(data.id)}>
                     <RemoveIcon />
                  </Fab>
                </Grid>
            </Grid>
              <Grid item sx={{height:"80px",width:"60%"}}>
              <IconButton aria-label="delete" size="large" color='error' onClick={()=>handledelete(data.id)}>
               <DeleteIcon fontSize="inherit"  />
              </IconButton>
             </Grid>
            
          </Grid>
          </Grid>
  
        </Grid>
       ))} 
      <Grid container>
      <Grid item lg={12} md={12} sm={12} xs={12} sx={{
         }}>
        <Grid container 
  sx={{ 
    background: "rgba(255, 255, 255, 0.15)", 
    backdropFilter: "blur(10px)", 
    borderRadius: "20px", 
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)", 
    padding: "20px", 
    textAlign: "center", 
    width: "90%", 
    maxWidth: "600px", 
    margin: "auto", 
    display: "flex", 
    flexDirection: "column", 
    gap: "15px"
  }}
>
  <Typography variant="h4" fontWeight="bold">🛒 Cart Summary</Typography>

  <Grid container justifyContent="space-between" alignItems="center">
    <Typography variant="h6" fontWeight="bold">Total Items:</Typography>
    <Typography variant="h6">{cart.length}</Typography>
  </Grid>

  <Grid container justifyContent="space-between" alignItems="center">
    <Typography variant="h6" fontWeight="bold">Total Price:</Typography>
    <Typography variant="h6" sx={{ color: "#ff5722", fontWeight: "bold" }}>
      ${cart.reduce((acc, data) => (count[data.id] || 1) * data.price1 + acc, 0).toFixed(2)}
    </Typography>
  </Grid>

 
</Grid>

      </Grid>
      </Grid>

    </Grid>
             )
             }
      
   </Box>
   
  )
}
