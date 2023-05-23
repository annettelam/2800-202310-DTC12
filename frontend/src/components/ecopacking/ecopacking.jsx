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
                <Popover isOpen={popoverOpen} onClose={togglePopover} closeOnBlur={false}>
                    <PopoverTrigger>
                        <IconButton
                            variant="ghost"
                            aria-label="Toggle EcoPacking"
                            className="ecopacking-button"
                            onClick={togglePopover}
                        >
                            <Flex align="center">
                                <FaLeaf style={{ color: '#48BB78' }} className="ecopacking-icon" />
                                <FaSuitcase style={{ color: 'brown' }} className="ecopacking-icon" />
                            </Flex>
                        </IconButton>
                    </PopoverTrigger>
                    <PopoverContent width="500px" boxShadow="md" p={2} borderRadius="md">
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverBody>
                            <Recommendations flightId={flightId} />
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>
        </Tooltip>
    );
};
