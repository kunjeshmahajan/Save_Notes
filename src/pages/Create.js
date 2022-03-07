import React, {useState} from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { FormControlLabel,makeStyles} from '@material-ui/core'

import TextField from '@material-ui/core/Textfield'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles({
  field:{
    marginTop: 20,
    marginBottom: 20,
    display:'block'
  }

})

export default function Create() {
  const classes =useStyles()
  const [title,setTitle]=useState('')
  const [details,setDetails]=useState('')
  const [titleError,setTitleError]=useState(false)
  const [detailsError,setDetailsError]=useState('')
  const [category,setCategory]=useState('')
  const history = useHistory()
  const handleSubmit = (e) =>{
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)
    if(title == ''){
      setTitleError(true)
    }
    if(details == ''){
      setDetailsError(true)
    }


    if (title && details) {
      fetch('http://localhost:8000/notes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({ title, details, category })
      }).then(() => history.push('/'))
    } 
  }
  return (
    <Container>
      <Typography 
      className={classes.title}
      variant='h6'
      gutterBottom
      color="textSecondary"
      >
          Create a new note
      </Typography>
      <form noValidate autoComplete='off' onSubmit={handleSubmit}>
        <TextField
        onChange={(e)=>setTitle(e.target.value)}
        className={classes.field}
        label='Note Title'
        variant='outlined'
        color='secondary'
        fullWidth
        required
        error={titleError}
         />
         <TextField
         onChange={(e)=>setDetails(e.target.value)}
        className={classes.field}
        label='Details'
        variant='outlined'
        color='secondary'
        fullWidth
        multiline
        rows={4}
        required
        error={detailsError}
         />
      <FormControl className={classes.field}>
      <FormLabel>Note Category</FormLabel>
        <RadioGroup value={category} onChange={(e)=>setCategory(e.target.value)}>
         <FormControlLabel value='money'control ={<Radio />} label='money'/>        
         <FormControlLabel value='todos'control ={<Radio />} label='todos'/>        
         <FormControlLabel value='remainders'control ={<Radio />} label='remainders'/>      
         <FormControlLabel value='work'control ={<Radio />} label='work'/>        
         </RadioGroup>
         </FormControl>
      <Button
       onClick={handleSubmit}    
      type="submit" color="secondary" variant="contained">Submit</Button>
    
      </form>
      </Container>
  )
}