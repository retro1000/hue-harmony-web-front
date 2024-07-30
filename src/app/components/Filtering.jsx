import { Card, CardContent , Typography, Checkbox, Button,  FormControlLabel, FormGroup, Accordion,  AccordionSummary, AccordionDetails  } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const Filters = ({ filters, handleFilterChange, handleClearAll }) => (
    <Card style={{ marginBottom: 16 }}>
      <CardContent>
        <Typography variant="h6">Filters</Typography>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Position</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={filters.positionExterior} onChange={handleFilterChange} name="positionExterior" />}
                label="Exterior"
              />
              <FormControlLabel
                control={<Checkbox checked={filters.positionInterior} onChange={handleFilterChange} name="positionInterior" />}
                label="Interior"
              />
              <FormControlLabel
                control={<Checkbox checked={filters.positionInteriorExterior} onChange={handleFilterChange} name="positionInteriorExterior" />}
                label="Interior and Exterior"
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Product type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={filters.productTypeCleaner} onChange={handleFilterChange} name="productTypeCleaner" />}
                label="Cleaner"
              />
              <FormControlLabel
                control={<Checkbox checked={filters.productTypePaint} onChange={handleFilterChange} name="productTypePaint" />}
                label="Paint"
              />
              <FormControlLabel
                control={<Checkbox checked={filters.productTypeUndercoat} onChange={handleFilterChange} name="productTypeUndercoat" />}
                label="Undercoat"
              />
              <FormControlLabel
                control={<Checkbox checked={filters.productTypeVarnish} onChange={handleFilterChange} name="productTypeVarnish" />}
                label="Varnish"
              />
              <FormControlLabel
                control={<Checkbox checked={filters.productTypeWaterproofing} onChange={handleFilterChange} name="productTypeWaterproofing" />}
                label="Waterproofing"
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle1">Room types</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={filters.roomTypeBathroom} onChange={handleFilterChange} name="roomTypeBathroom" />}
                label="Bathroom"
              />
              <FormControlLabel
                control={<Checkbox checked={filters.roomTypeBedroom} onChange={handleFilterChange} name="roomTypeBedroom" />}
                label="Bedroom"
              />
              {/* Add more room types as needed */}
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <br></br>
        <Button variant="contained" color="primary" onClick={handleClearAll}>
          Clear All
        </Button>
      </CardContent>
    </Card>
  );