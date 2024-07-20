import { useState } from 'react';
import { styled, Stack, Box, Radio, FormControlLabel, RadioGroup, Grid, FormLabel, FormControl, Icon, Typography, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

import { FileUpload, NumberFormatField } from '..';

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
          <TextField
            value={field.value}
            onChange={(event) => field.setValue(event.target.value)}
            label={`${field.label}${field.required?'*':''}`}
            placeholder={field.placeholder}
            type={field.type}
            // error={productErrors.productSubTitle !== undefined}
            // helperText={productErrors.productSubTitle}
          ></TextField>
        )
      case 'file':
        // return (
        //   <FileUpload close={field.close} id={`${field.id}-input-${f_index++}`} sx={{marginBottom: '1.9em', marginLeft: '-6px'}} required={field.required} file={values[field.id]?values[field.id]:''} setFile={(val) => {const updatedValues = {...values,[field.id]: val};setValues(updatedValues)}}/>
        // )
      case 'number':
        return (
          <NumberFormatField
              inputProps={{
              id:`${field.id}-input-${f_index++}`,
              placeholder:`${field.placeholder}`,
              label:`${field.label}${field.required?'*':''}`,
              type:"number",
              inputProps:{ 'aria-label': `${field.id}-input-${f_index}`, step:'any', inputMode: 'decimal' }
            }}
            label={`${field.label}${field.required?'*':''}`}
            allowNegative={field.allowNegative}
            decimalScale={field.decimalScale}
            fixedDecimalScale={field.fixedDecimalScale}
            value={field.value}
            // error={props.variationErrors[item.identifier]?.unitCost!==undefined}
            // helperText={props.variationErrors[item.identifier]?.unitCost}
            onChange={(event) => field.setValue(event.target.value)}
          />
        )
      case 'tel':
        return (
          <PhoneInput
            country={'lk'}
            value={field.value}
            onChange={(value) => field.setValue(value)}
            inputComponent={TextField}
            inputProps={{
              variant: 'outlined',
              label: `${field.label}${field.required?'*':''}`,
              fullWidth: false
            }}
          />
        )
      case 'radio':
        return (
          <FormControl sx={{marginTop: '1.7em'}}>
            <FormLabel id={`${field.id}-radio-input-${f_index++}`}>{`${field.label}${field.required?'*':''}`}</FormLabel>
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
          </FormControl>
        )
      case 'select':
        return (
          <></>
        )
      default:
    }
  })
}


export default function PopupFormDialog({open, titleIcon: TitleIcon, title, setOpen, message, fields, setVariations, submitButton, reasonCloseOn=false, setValues}) {

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
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" sx={{borderBottom: '1px solid gray'}}>
          {
            TitleIcon ?
            <Grid marginLeft={'-18px'} display={'flex'} gap={'0.5em'} justifyContent={'flex-start'} alignItems={'center'}>
              {TitleIcon}
              <Typography variant='h6' sx={{color: 'gray'}}>{title}</Typography>
            </Grid> :
            <Typography marginLeft={'-18px'} variant='h6' sx={{color: 'gray'}}>{title}</Typography>
          }
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{marginBottom: '1.2em'}}>
            {message ? message : ''}
          </DialogContentText>
          <Stack sx={{display: 'flex', alignItems: 'flex-start'}} spacing={2}>
            {
              (fields && fields.require && fields.require.length>0) ?
                <>{createFormFields(fields.require)}</> : ''
            }
            {
              (fields && fields.optional && fields.optional.length>0) ?
                <AccordionRoot sx={{padding: 'none'}}>
                  <Accordion sx={{padding: 'none', boxShadow: 'none'}}>
                    <AccordionSummary sx={{padding: 'none'}} expandIcon={expand?<MinusIcon />:<AddIcon />} onClick={handleAccordionClick}>Additional Information</AccordionSummary>
                    <AccordionDetails sx={{padding: 'none'}}>{createFormFields(fields.optional)}</AccordionDetails>
                  </Accordion>
                </AccordionRoot> : ''
            }
          </Stack>
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
