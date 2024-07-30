import React, { useState, useEffect } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import AddProduct from "./AddProduct";
import ChangeStatus from "../../ux/modals/ChangeStatus";
import EditProduct from "./EditProduct";
import { IoClose } from "react-icons/io5";
import { IoMdCheckmark } from "react-icons/io";
import { BarChart } from '@mui/x-charts/BarChart';
import { IoIosArrowDown, IoIosArrowUp  } from "react-icons/io";
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

function TickParamsSelector({
    tickPlacement,
    tickLabelPlacement,
    setTickPlacement,
    setTickLabelPlacement,
  }) {
    return (
      <Stack direction="column" justifyContent="space-between" sx={{ width: '100%' }}>
        <FormControl>
          <FormLabel id="tick-placement-radio-buttons-group-label">
            tickPlacement
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="tick-placement-radio-buttons-group-label"
            name="tick-placement"
            value={tickPlacement}
            onChange={(event) => setTickPlacement(event.target.value)}
          >
            <FormControlLabel value="start" control={<Radio />} label="start" />
            <FormControlLabel value="end" control={<Radio />} label="end" />
            <FormControlLabel value="middle" control={<Radio />} label="middle" />
            <FormControlLabel
              value="extremities"
              control={<Radio />}
              label="extremities"
            />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel id="label-placement-radio-buttons-group-label">
            tickLabelPlacement
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="label-placement-radio-buttons-group-label"
            name="label-placement"
            value={tickLabelPlacement}
            onChange={(event) => setTickLabelPlacement(event.target.value)}
          >
            <FormControlLabel value="tick" control={<Radio />} label="tick" />
            <FormControlLabel value="middle" control={<Radio />} label="middle" />
          </RadioGroup>
        </FormControl>
      </Stack>
    );
}

const dataset = [
    {
        london: 59,
        paris: 57,
        newYork: 86,
        seoul: 21,
        month: 'Jan',
    },
    {
        london: 50,
        paris: 52,
        newYork: 78,
        seoul: 28,
        month: 'Fev',
    },
    {
        london: 47,
        paris: 53,
        newYork: 106,
        seoul: 41,
        month: 'Mar',
    },
    {
        london: 54,
        paris: 56,
        newYork: 92,
        seoul: 73,
        month: 'Apr',
    },
    {
        london: 57,
        paris: 69,
        newYork: 92,
        seoul: 99,
        month: 'May',
    },
    {
        london: 60,
        paris: 63,
        newYork: 103,
        seoul: 144,
        month: 'June',
    },
    {
        london: 59,
        paris: 60,
        newYork: 105,
        seoul: 319,
        month: 'July',
    },
    {
        london: 65,
        paris: 60,
        newYork: 106,
        seoul: 249,
        month: 'Aug',
    },
    {
        london: 51,
        paris: 51,
        newYork: 95,
        seoul: 131,
        month: 'Sept',
    },
    {
        london: 60,
        paris: 65,
        newYork: 97,
        seoul: 55,
        month: 'Oct',
    },
    {
        london: 67,
        paris: 64,
        newYork: 76,
        seoul: 48,
        month: 'Nov',
    },
    {
        london: 61,
        paris: 70,
        newYork: 103,
        seoul: 25,
        month: 'Dec',
    },
];

const chartSetting = {
    yAxis: [
        {
            label: 'rainfall (mm)',
        },
    ],
    series: [{ dataKey: 'seoul' }],
    height: 300,
    sx: {
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
            transform: 'translateX(-10px)',
        },
    },
};

function Stat({ openModal }) {
    const [filter, setFilter] = useState('ПРОСМОТРЫ');
    const [isOpenFilter, setIsOpenFiler] = useState(false);

    const [date, setDate] = useState('ЗА 7 ДНЕЙ');
    const [isOpenDate, setIsOpenDate] = useState(false);

    const [tickPlacement, setTickPlacement] = React.useState('middle');
    const [tickLabelPlacement, setTickLabelPlacement] = React.useState('middle');

    const handleFilter = (filter) => {
        setFilter(filter);
        setIsOpenFiler(false)
    }

    const handleDate = (filter) => {
        setDate(filter);
        setIsOpenDate(false)
    }

    return (
        <div className="w-6/12 mt-2 flex-row flex flex-wrap">
            <div className="flex flex-row w-full justify-between">
                <div className="relative">
                    <button onClick={() => setIsOpenFiler(!isOpenFilter)} className="hover:opacity-50 flex flex-row space-x-2 items-center bg-[#EFF3F6] rounded-xl p-2 px-4">
                        <p className="text-xl ">{filter}</p>
                        { isOpenFilter ? (
                            <IoIosArrowUp className="text-xl"/>
                        ) : (
                            <IoIosArrowDown className="text-xl"/>
                        ) }
                    </button>
                    { isOpenFilter && (
                        <div className="w-full border-2 border-[#EFF3F6] p-2 bg-white absolute z-10 rounded-xl mt-2">
                            <button onClick={() => handleFilter('ПРОСМОТРЫ')} className="hover:opacity-50">
                                <p className="text-xl ">ПРОСМОТРЫ</p>
                            </button>
                            <button onClick={() => handleFilter('ПРОДАЖИ')} className="hover:opacity-50">
                                <p className="text-xl ">ПРОДАЖИ</p>
                            </button>
                        </div>
                    ) }
                </div>
                <div className="relative">
                    <button onClick={() => setIsOpenDate(!isOpenDate)} className="hover:opacity-50 flex flex-row space-x-2 items-center bg-[#EFF3F6] rounded-xl p-2 px-4">
                        <p className="text-xl ">{date}</p>
                        { isOpenDate ? (
                            <IoIosArrowUp className="text-xl"/>
                        ) : (
                            <IoIosArrowDown className="text-xl"/>
                        ) }
                    </button>
                    { isOpenDate && (
                        <div className="w-full border-2 border-[#EFF3F6] p-2 bg-white absolute z-10 rounded-xl mt-2">
                            <button onClick={() => handleDate('ЗА 1 ДЕНЬ')} className="hover:opacity-50">
                                <p className="text-xl ">ЗА 1 ДЕНЬ</p>
                            </button>
                            <button onClick={() => handleDate('ЗА 7 ДНЕЙ')} className="hover:opacity-50">
                                <p className="text-xl ">ЗА 7 ДНЕЙ</p>
                            </button>
                            <button onClick={() => handleDate('ЗА МЕСЯЦ')} className="hover:opacity-50">
                                <p className="text-xl ">ЗА МЕСЯЦ</p>
                            </button>
                        </div>
                    ) }
                </div>
            </div>
            <BarChart
                dataset={dataset}
                xAxis={[
                    { scaleType: 'band', dataKey: 'month', tickPlacement, tickLabelPlacement },
                ]}
                    {...chartSetting}
                />
        </div>
    )
};

export default Stat;