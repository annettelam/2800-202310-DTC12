import React, { useState } from 'react';
import {
    Box,
    Flex,
    IconButton,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    PopoverCloseButton,
    PopoverBody,
    Tooltip,
} from '@chakra-ui/react';
import { FaLeaf, FaSuitcase } from 'react-icons/fa';
import { Recommendations } from '../recommendations/recommendations';

export const Ecopacking = ({ flightId }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const togglePopover = () => setPopoverOpen(!popoverOpen);

    return (
        <Tooltip label="Hi! I'm your Eco Packing Assistant, happy to help! ">
            <Box ml="auto">
                {/* Popover component for displaying recommendations */}
                <Popover isOpen={popoverOpen} onClose={togglePopover} closeOnBlur={false}>
                    <PopoverTrigger>
                        {/* Button to toggle the popover */}
                        <IconButton
                            variant="ghost"
                            aria-label="Toggle EcoPacking"
                            className="ecopacking-button"
                            onClick={togglePopover}
                        >
                            <Flex align="center">
                                {/* Leaf icon */}
                                <FaLeaf style={{ color: '#48BB78' }} className="ecopacking-icon" />
                                {/* Suitcase icon */}
                                <FaSuitcase style={{ color: 'brown' }} className="ecopacking-icon" />
                            </Flex>
                        </IconButton>
                    </PopoverTrigger>
                    {/* Popover content */}
                    <PopoverContent width="95%" boxShadow="md" p={2} borderRadius="md">
                        {/* Popover arrow */}
                        <PopoverArrow />
                        {/* Popover close button */}
                        <PopoverCloseButton />
                        {/* Popover body */}
                        <PopoverBody>
                            {/* Recommendations component for displaying eco-packing recommendations */}
                            <Recommendations flightId={flightId} />
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>
        </Tooltip>
    );
};
