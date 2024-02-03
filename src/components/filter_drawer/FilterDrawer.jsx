import style from "./FilterDrawer.module.css";
import { useEffect, useState } from "react";
import { useStateManagment, useFilters } from "../../store/store";
import { Drawer } from "@mui/material";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import * as Icon from "react-bootstrap-icons";

export default function FilterDrawer({ makeRequest }) {
    // DRAWER
    const isOpenedFilterDrawer = useStateManagment(state => state.isOpenedFilterDrawer);
    const changeStatusFilterDrawer = useStateManagment(state => state.changeStatusFilterDrawer);
    // FILTER
    const priceMin = useFilters(state => state.priceMin);
    const setPriceMin = useFilters(state => state.setPriceMin);
    const priceMax = useFilters(state => state.priceMax);
    const setPriceMax = useFilters(state => state.setPriceMax);
    const order = useFilters(state => state.order);
    const setOrder = useFilters(state => state.setOrder);
    const page = useFilters(state => state.page);
    const setPage = useFilters(state => state.setPage);
    // ЗНАЧЕНИЯ SLIDER
    const [sliderValues, setSliderValues] = useState(null);
    // DEFAULT RADIO
    const defaultOrderRadio = useStateManagment(state => state.defaultOrderRadio);
    const setDefaultOrderRadio = useStateManagment(state => state.setDefaultOrderRadio);

    useEffect(() => {
        // иначе slider не меняет значения, напрямую values = [min, max] не работает
        setSliderValues([priceMin, priceMax]);
    }, [priceMin, priceMax]);

    return (
        <div>
            <Drawer
                anchor="top"
                open={isOpenedFilterDrawer}
                disableScrollLock={true}
                sx={{ zIndex: "0" }}
                onClick={() => {
                    changeStatusFilterDrawer(false);
                }}
            >
                <div className={style.drawerContent} onClick={e => e.stopPropagation()}>
                    <div className={style.filterContainer}>
                        <div className={style.filters}>
                            <div className={style.boldText}>PRICE</div>
                            <div className={style.currency}>
                                <div>{`US$ ${sliderValues ? sliderValues[0] : ""}`}</div>
                                <div>{`US$ ${sliderValues ? sliderValues[1] : ""}`}</div>
                            </div>
                            <Slider
                                size="small"
                                getAriaLabel={() => "Temperature range"}
                                valueLabelDisplay="auto"
                                sx={{
                                    color: "black",
                                    marginLeft: "5px"
                                }}
                                min={priceMin}
                                max={priceMax}
                                value={sliderValues}
                                onChange={e => {
                                    setSliderValues(e.target.value);
                                }}
                            />
                            <div className={style.boldText}>SORT BY</div>
                            <div className={style.inputsContainer}>
                                <FormControl>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        // при очистке будет возвращать к none
                                        value={defaultOrderRadio}
                                        name="radio-buttons-group"
                                    >
                                        <FormControlLabel
                                            value=""
                                            onClick={e => {
                                                setOrder(e.target.value);
                                                setDefaultOrderRadio(e.target.value);
                                            }}
                                            control={
                                                <Radio
                                                    size="small"
                                                    sx={{
                                                        color: "grey",
                                                        "&.Mui-checked": {
                                                            color: "grey"
                                                        }
                                                    }}
                                                />
                                            }
                                            label="None"
                                            sx={{
                                                ".MuiFormControlLabel-label": {
                                                    fontFamily:
                                                        "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                                    fontSize: "14px",
                                                    letterSpacing: "0.5px"
                                                },
                                                marginTop: "10px"
                                            }}
                                        />
                                        <FormControlLabel
                                            value="asc"
                                            onClick={e => {
                                                setOrder(e.target.value);
                                                setDefaultOrderRadio(e.target.value);
                                            }}
                                            control={
                                                <Radio
                                                    size="small"
                                                    sx={{
                                                        color: "grey",
                                                        "&.Mui-checked": {
                                                            color: "grey"
                                                        }
                                                    }}
                                                />
                                            }
                                            label="Lowest to Highest price"
                                            sx={{
                                                ".MuiFormControlLabel-label": {
                                                    fontFamily:
                                                        "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                                    fontSize: "14px",
                                                    letterSpacing: "0.5px"
                                                },
                                                marginTop: "-10px"
                                            }}
                                        />
                                        <FormControlLabel
                                            value="desc"
                                            onClick={e => {
                                                setOrder(e.target.value);
                                                setDefaultOrderRadio(e.target.value);
                                            }}
                                            control={
                                                <Radio
                                                    size="small"
                                                    sx={{
                                                        color: "grey",
                                                        "&.Mui-checked": {
                                                            color: "rgb(79, 78, 78)"
                                                        }
                                                    }}
                                                />
                                            }
                                            label="Highest to Lowest price"
                                            sx={{
                                                ".MuiFormControlLabel-label": {
                                                    fontFamily:
                                                        "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
                                                    fontSize: "14px",
                                                    letterSpacing: "0.5px"
                                                },
                                                marginTop: "-10px"
                                            }}
                                        />
                                    </RadioGroup>
                                </FormControl>
                            </div>
                        </div>
                        <Icon.XLg
                            className={style.closeIcon}
                            onClick={() => {
                                changeStatusFilterDrawer(false);
                            }}
                        />
                    </div>
                    <div className={style.buttonsContainer}>
                        <button
                            onClick={() => {
                                setSliderValues([priceMin, priceMax]);
                                setOrder("");
                                setDefaultOrderRadio("");
                            }}
                            className={style.clearButton}
                        >
                            Clear filters
                        </button>
                        <button
                            onClick={() => {
                                setPage(1);
                                makeRequest(sliderValues[0], sliderValues[1], order, page);
                                changeStatusFilterDrawer(false);
                            }}
                            className={style.showButton}
                        >
                            Show items
                        </button>
                    </div>
                </div>
            </Drawer>
        </div>
    );
}
