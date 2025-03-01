import React, { useEffect, useState } from 'react'
import { Box,Grid, Grid2, Typography ,Snackbar} from '@mui/material'
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DiscountIcon from '@mui/icons-material/Discount';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
export const Home = () => {
  const [newarrivals,setNewarrivals]=useState([])
  const [cart,setCart]=useState([])
  const [error,setError]=useState("")
  const [message,setMessage]=useState("")
  const [snackbarOpen,setSnackbarOpen]=useState(false)



    const fetcharrivals=async ()=>{
        try{
            const res=await axios.get("http://localhost:3000/newarrivals")
            setNewarrivals(res.data)
        }
        catch(err){
            console.log(err.message)
        }
    }

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

    useEffect(()=>{
        fetcharrivals()
    },[newarrivals])
  return (
    <>
    <Box sx={{height:"auto"}}>
    <Grid container >
      <Grid item  sx={{height:{lg:"65px",md:"50px"},width:{lg:"100%"},border:{lg:"solid",md:"solid"}}}></Grid>
    </Grid>
     <Snackbar
         open={snackbarOpen}
         autoHideDuration={3000}
         onClose={() => setSnackbarOpen(false)}
         message={message || error}
         />
    <Grid container >
      <Box sx={{height:"600px",width:"100%",backgroundImage:"url(https://image.freepik.com/free-vector/online-shopping-background_10045-352.jpg)",backgroundSize:"contain",backgroundRepeat:"no-repeat" ,backgroundPosition: "center",marginTop:""}}>
      
      </Box>

    </Grid>
    <Grid container sx={{mt:5,display:"flex",justifyContent:"space-evenly"}}>
      <Grid item lg={2.8} md={5} sm={8} xs={10} sx={{height:"150px",display:"flex",justifyContent:"space-evenly",borderRadius:"30px",backgroundColor:"rgb(249, 224, 252);",m:1}}>
        <Grid sx={{height:"100%",width:"17%"}}>
          <LocalShippingIcon sx={{fontSize:"60px",mt:5}} />
        </Grid>
        <Grid sx={{height:"40%",width:"60%",mt:5}}>
            <Typography variant='h5'sx={{ fontSize: { xs: "20px" }}}> Free Delivery</Typography>
            <Typography variant='h6' sx={{ color: "grey", fontSize: { xs: "17px" } }}>Orders from all items</Typography>
        </Grid>
     </Grid>
     <Grid item lg={2.8} md={5} sm={8} xs={10} sx={{height:"150px",display:"flex",justifyContent:"space-evenly",borderRadius:"30px",backgroundColor:"rgb(249, 224, 252);",m:1}}>
        <Grid sx={{height:"100%",width:"17%"}}>
          <MonetizationOnIcon sx={{fontSize:"60px",mt:5}} />
        </Grid>
        <Grid sx={{height:"40%",width:"60%",mt:5}}>
            <Typography variant='h5'sx={{ fontSize: { xs: "20px" }}}> Return & Refund</Typography>
            <Typography variant='h6' sx={{ color: "grey", fontSize: { xs: "17px" } }}>Money back guarantee</Typography>
        </Grid>
     </Grid>
     <Grid item lg={2.8} md={5} sm={8} xs={10} sx={{height:"150px",display:"flex",justifyContent:"space-evenly",borderRadius:"30px",backgroundColor:"rgb(249, 224, 252);",m:1}}>
        <Grid sx={{height:"100%",width:"17%"}}>
          < DiscountIcon sx={{fontSize:"60px",mt:5}} />
        </Grid>
        <Grid sx={{height:"40%",width:"60%",mt:5}}>
            <Typography variant='h5' sx={{ fontSize: { xs: "20px" }}}> Member Discount</Typography>
            <Typography variant='h6' sx={{ color: "grey", fontSize: { xs: "17px" } }}>On order over $99</Typography>
        </Grid>
     </Grid>
     <Grid item lg={2.8} md={5} sm={8} xs={10} sx={{height:"150px",display:"flex",justifyContent:"space-evenly",borderRadius:"30px",backgroundColor:"rgb(249, 224, 252);",m:1}}>
        <Grid sx={{height:"100%",width:"17%"}}>
          <SupportAgentIcon sx={{fontSize:"60px",mt:5}} />
        </Grid>
        <Grid sx={{height:"40%",width:"60%",mt:5}}>
            <Typography variant='h5' sx={{ fontSize: { xs: "20px" }}}> Support 24/7</Typography>
            <Typography variant='h6' sx={{ color: "grey", fontSize: { xs: "17px" } }}>Contact us 24 hours a day</Typography>
        </Grid>
     </Grid>

    </Grid>
    
    <Grid container sx={{mt:5}}>
        <Grid item sx={{height:"60px",ml:5}}>
            <Typography variant='h3' sx={{fontWeight:"bold",fontFamily:"Brush Script MT"}}>New Arrivals 😍!!!</Typography>
        </Grid>
         <Grid item sx={{display:"flex",flexWrap:"wrap",mt:5}}>
           {newarrivals.map((data,index)=>(
            <Card key={index} sx={{ width: { xs: "90%", sm: "80%", md: "90%", lg: "100%" },maxWidth: 400,m:5}}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="400"
               
                image={data.image_url}
                alt="green iguana"
                sx={{
                  objectFit:"contain"
                }}
               
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                 {data.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {data.description}
                </Typography>
                <Typography gutterBottom variant="h5" component="div" sx={{color:"Green"}}>
                           ${data.price1}
                          </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary" onClick={()=>handle_click(data)}>
                Add to Cart
              </Button>
            </CardActions>
          </Card>
           ))}
         </Grid>
    </Grid>
    </Box>
    </>
  )
}
