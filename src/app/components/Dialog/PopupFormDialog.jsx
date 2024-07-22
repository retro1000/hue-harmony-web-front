import { useState } from 'react';
import { styled, Stack, Box, Radio, FormControlLabel, RadioGroup, Grid, FormLabel, FormControl, Select, MenuItem, Icon, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { SearchableSelectMultiple, FileUpload, NumberFormatField } from '..';

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import AddIcon from '@mui/icons-material/Add'
import MinusIcon from '@mui/icons-material/Remove'

const AccordionRoot = styled("div")(({ theme }) => ({
  width: "100%",
  "& .heading": {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

let f_index = 0

const createFormFields = (fields) => {
  return fields.map((field, index) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <Stack display='flex' gap='0.5em' sx={field.sx || {maxWidth: '350px', minWidth: '200px', width: '30%'}}>
              <div style={{display: 'flex', gap: '0.2em'}}><Typography color='#363636'>{field.label}</Typography>{field.required?<Typography color='red'>*</Typography>:''}</div>
              <TextField
              value={field.value}
              onChange={(event) => field.setValue(event.target.value)}
              // label={`${field.label}${field.required?'*':''}`}
              placeholder={field.placeholder}
              type={field.type}
              sx={{width: '100%'}}
              // error={productErrors.productSubTitle !== undefined}
              // helperText={productErrors.productSubTitle}
            ></TextField>
          </Stack>
        )
      case 'file':
        // return (
        //   <FileUpload close={field.close} id={`${field.id}-input-${f_index++}`} sx={{marginBottom: '1.9em', marginLeft: '-6px'}} required={field.required} file={values[field.id]?values[field.id]:''} setFile={(val) => {const updatedValues = {...values,[field.id]: val};setValues(updatedValues)}}/>
        // )
      case 'number':
        return (
            <Stack  display='flex' gap='0.5em' sx={field.sx || {maxWidth: '200px', minWidth: '150px', width: '20%'}}>
              <div style={{display: 'flex', gap: '0.2em'}}><Typography color='#363636'>{field.label}</Typography>{field.required?<Typography color='red'>*</Typography>:''}</div>
              <NumberFormatField
                  inputProps={{
                  id:`${field.id}-input-${f_index++}`,
                  placeholder:`${field.placeholder}`,
                  // label:`${field.label}${field.required?'*':''}`,
                  type:"number",
                  inputProps:{ 'aria-label': `${field.id}-input-${f_index}`, step:'any', inputMode: 'decimal' }
                }}
                // label={`${field.label}${field.required?'*':''}`}
                allowNegative={field.allowNegative}
                decimalScale={field.decimalScale}
                fixedDecimalScale={field.fixedDecimalScale}
                value={field.value}
                // error={props.variationErrors[item.identifier]?.unitCost!==undefined}
                // helperText={props.variationErrors[item.identifier]?.unitCost}
                onChange={(event) => field.setValue(event.target.value)}
              />
            </Stack>
        )
      case 'tel':
        return (
          <Stack display='flex' gap='0.4em' sx={field.sx || { maxWidth: '280px', minWidth: '250px', width: '20%' }}>
             <div style={{display: 'flex', gap: '0.2em'}}><Typography color='#363636'>{field.label}</Typography>{field.required?<Typography color='red'>*</Typography>:''}</div>
             <PhoneInput
              containerStyle={field.sx || { maxWidth: '280px', minWidth: '250px', width: '20%' }}
              inputStyle={field.sx || { maxWidth: '280px', minWidth: '250px', width: '20%' }}
              country={'lk'}
              value={field.value}
              onChange={(value) => field.setValue(value)}
              inputComponent={TextField}
              inputProps={{
                variant: 'outlined',
                // label: `${field.label}${field.required ? '*' : ''}`, // Remove this line as we are using FormLabel
                // fullWidth: false
              }}
            />
          </Stack>
        )
      case 'radio':
        return (
          <Stack display='flex' gap='0.5em' sx={{marginTop: '1.7em'}}>
             <div style={{display: 'flex', gap: '0.2em'}}><Typography color='#363636'>{field.label}</Typography>{field.required?<Typography color='red'>*</Typography>:''}</div>
             <RadioGroup
              aria-labelledby={`${field.id}-radio-input-${f_index}`}
              name="radio-buttons-group"
              row
              defaultValue={field.options[0].value}
              // value={values[field.id]?values[field.id]:'ALLOWED_ALL'}
              onChange={(event, val) => field.setValue(val)}
            >
              {
                field.options.map(option=>(
                  <FormControlLabel value={option.value} control={<Radio />} label={option.label} />
                ))
              }
            </RadioGroup>
          </Stack>
        )
      case 'select':
        return (
          <div style={{width: `${field.break?'100%':'max-content'}`}}>
            <Stack  display='flex' gap='0.5em' sx={field.sx || {width: '40%', maxWidth: '250px', minWidth: '200px'}} >
              <div style={{display: 'flex', gap: '0.2em'}}><Typography color='#363636'>{field.label}</Typography>{field.required?<Typography color='red'>*</Typography>:''}</div>
              <Select key={`select-${field.id}-${f_index++}`} id={`select-${field.id}-${f_index++}`}value={field.value} size="small" onChange={(event)=>field.setValue(event.target.value)}>
                {
                  field.options.map(option=>(
                    <MenuItem value={option.value}>{option.label}</MenuItem>
                  ))
                }
              </Select>
              {/* <SearchableSelectMultiple
                key={`select-${field.id}-${f_index++}`}
                id={`select-${field.id}-${f_index++}`}
                // label={field.label} 
                multiple={field.multi} 
                options={field.options} 
                setSelectedValues={(val)=>field.setValue(val)} 
                selectedValues={field.value} 
                
              /> */}
            </Stack>
          </div>
        )
      default:
    }
  })
}

const formMaxHeight = 500


export default function PopupFormDialog({popupSx='md', open, titleIcon: TitleIcon, title, setOpen, message, fields, setVariations, submitButton, reasonCloseOn=false, setValues}) {

  const [expand, setExpand] = useState(false);

  const handleClose = (event, reason) => {
    if (!reasonCloseOn || (reason !== "backdropClick" && reason !== "escapeKeyDown")) {
      setOpen(false);
      setValues({})
    }
  }

  const handleAccordionClick = () => {
    setExpand((prevExpand) => !prevExpand);
  };

  const handleSubmit = () => {
    // setVariations(values);
    // setOpen(false);
    // setValues({})
  }

  // const textFields = [].concat(fields.filter(field=>(['number', 'text', 'email'].includes(field.type))))
  // const radios = [].concat(fields.filter(field=>(field.type==='radio')))
  // const files = [].concat(fields.filter(field=>(field.type==='file')))

  return (
    <Box>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth={popupSx} fullWidth={true}>
        <DialogTitle id="form-dialog-title" sx={{borderBottom: '1px solid silver'}}>
          {
            TitleIcon ?
            <Grid marginLeft={'-18px'} display={'flex'} gap={'0.5em'} justifyContent={'flex-start'} alignItems={'center'}>
              {TitleIcon}
              <Typography variant='h6' sx={{color: 'gray'}}>{title}</Typography>
            </Grid> :
            <Typography marginLeft={'-18px'} variant='h6' sx={{color: 'gray'}}>{title}</Typography>
          }
        </DialogTitle>

        <DialogContent fullWidth={true} sx={{overflowY: 'scroll', maxHeight: '500px'}}>
          <DialogContentText sx={{marginBottom: '1.2em'}}>
            {message ? message : ''}
          </DialogContentText>
          <br></br>
          <Box sx={{display: 'flex', alignItems: 'flex-start', width: '100%', flexWrap: 'wrap'}} spacing={3} gap={3}>
            {
              (fields && fields.require && fields.require.length>0) ?
                <>{createFormFields(fields.require)}</> : ''
            }
            {
              (fields && fields.optional && fields.optional.length>0) ?
                <AccordionRoot>
                  <br></br>
                  <Accordion sx={{padding: 'none', boxShadow: 'none'}}>
                    <AccordionSummary style={{padding: '0', borderBottom: '0.1em solid gray', minHeight: '0', height: '25px', color:'gray', fontSize: '1.1em'}} expandIcon={!expand?<MinusIcon sx={{color:'gray'}} />:<AddIcon sx={{color: 'gray'}} />} onClick={handleAccordionClick}>Additional Information</AccordionSummary>
                    <br></br>
                    <AccordionDetails sx={{padding: '0'}}><Box sx={{display: 'flex', alignItems: 'flex-start', width: '100%', flexWrap: 'wrap'}} spacing={3} gap={3}>{createFormFields(fields.optional)}</Box></AccordionDetails>
                  </Accordion>
                </AccordionRoot> : ''
            }
          </Box>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="contained" onClick={handleSubmit} color="primary">
            {submitButton}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
