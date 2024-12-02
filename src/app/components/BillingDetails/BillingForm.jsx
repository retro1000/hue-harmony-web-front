import React, { useState } from "react";
import {
    TextField,
    Checkbox,
    FormControlLabel,
    Grid,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
} from "@mui/material";

const BillingForm = ({ orderDetails, setOrderDetails }) => {
    const [district, setDistrict] = useState(orderDetails?.district || "");
    const [city, setCity] = useState(orderDetails?.city || "");

    const districts = [
        { id: "COLOMBO", name: "Colombo" },
        { id: "GAMPAHA", name: "Gampaha" },
        { id: "KANDY", name: "Kandy" },
    ];

    const citiesByDistrict = {
        COLOMBO: [
            { id: "COLOMBO_01", name: "Colombo 01" },
            { id: "COLOMBO_02", name: "Colombo 02" },
            { id: "COLOMBO_03", name: "Colombo 03" },
        ],
        GAMPAHA: [
            { id: "GAMAPHA_CITY", name: "Gampaha City" },
            { id: "NEGOMBO", name: "Negombo" },
            { id: "RAGAMA", name: "Ragama" },
        ],
        KANDY: [
            { id: "KANDY_CITY", name: "Kandy City" },
            { id: "PERADENIYA", name: "Peradeniya" },
            { id: "KATUGASTOTA", name: "Katugastota" },
        ],
    };

    const handleDistrictChange = (event) => {
        setDistrict(event.target.value);
        setCity(""); // Reset city when district changes
        setOrderDetails({...orderDetails, district: district, city: "" }); // Reset city in order details
    };

    const handleCityChange = (event) => {
        setCity(event.target.value);
        setOrderDetails({...orderDetails, city: city }); // Update city in order details
    };

    const handleTextFieldChange = (event) => {
        const {name, value} = event.target;
        console.log(orderDetails, name, value)
        setOrderDetails({...orderDetails, [name]: name==="contactNos" ? [value] : value }); // Update other fields in order details
    }

    const fieldStyles = {
        // "& .MuiOutlinedInput-root": {
        //     borderRadius: 2,
        //     backgroundColor: "#f5f5f5",
        //     "& fieldset": {
        //         borderColor: "transparent",
        //     },
        //     "&:hover fieldset": {
        //         borderColor: "transparent",
        //     },
        //     "&.Mui-focused fieldset": {
        //         borderColor: "transparent",
        //     },
        // },
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    value={orderDetails?.firstName || ""}
                    variant="outlined"
                    sx={fieldStyles}
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    value={orderDetails?.lastName || ""}
                    fullWidth
                    autoComplete="family-name"
                    variant="outlined"
                    sx={fieldStyles}
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="shippingAddress"
                    name="shippingAddress"
                    label="Shipping Address"
                    value={orderDetails?.shippingAddress || ""}
                    fullWidth
                    autoComplete="shipping-address"
                    variant="outlined"
                    sx={fieldStyles}
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    id="billingAddress"
                    name="billingAddress"
                    label="Billing Address"
                    value={orderDetails?.billingAddress || ""}
                    fullWidth
                    autoComplete="billing-address"
                    variant="outlined"
                    sx={fieldStyles}
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl fullWidth variant="outlined" sx={fieldStyles}>
                    <InputLabel id="district-label">District</InputLabel>
                    <Select
                        labelId="district-label"
                        id="district"
                        value={district}
                        onChange={handleDistrictChange}
                        label="District"
                        size="small"
                        variant="outlined"
                    >
                        {districts.map((d) => (
                            <MenuItem key={d.id} value={d.id}>
                                {d.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl
                    fullWidth
                    variant="outlined"
                    sx={fieldStyles}
                    disabled={!district}
                >
                    <InputLabel id="city-label">City</InputLabel>
                    <Select
                        labelId="city-label"
                        id="city"
                        value={city}
                        onChange={handleCityChange}
                        label="City"
                        size="small"
                        variant="outlined"
                    >
                        {(citiesByDistrict[district] || []).map((c, index) => (
                            <MenuItem key={index} value={c.id}>
                                {c.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    required
                    id="contactNos"
                    name="contactNos"
                    label="Phone Number"
                    value={orderDetails?.contactNos?.[0] || ""}
                    fullWidth
                    autoComplete="tel"
                    variant="outlined"
                    sx={fieldStyles}
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    required
                    id="emailAddress"
                    name="emailAddress"
                    label="Email Address"
                    value={orderDetails?.emailAddress || ""}
                    fullWidth
                    autoComplete="emailAddress"
                    variant="outlined"
                    sx={fieldStyles}
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    multiline={true}
                    rows={6}
                    id="orderNote"
                    name="orderNote"
                    label="Order Note"
                    value={orderDetails?.orderNote || ""}
                    fullWidth
                    autoComplete="orderNote"
                    variant="outlined"
                    sx={fieldStyles}
                    onChange={handleTextFieldChange}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="secondary" name="saveInfo" value="yes" />}
                    label="Save this information for faster check-out next time"
                />
            </Grid>
        </Grid>
    );
};

export default BillingForm;
