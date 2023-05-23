import React, { useState } from 'react';
import { Box, Flex, IconButton, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverBody } from '@chakra-ui/react';
import { FaLeaf, FaSuitcase } from 'react-icons/fa';
import { Recommendations } from '../recommendations/recommendations';
import '../ecopacking/ecopacking.css';

export const Ecopacking = ({ flightId }) => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const togglePopover = () => setPopoverOpen(!popoverOpen);

    return (
        <Box ml="auto">
            <Popover
                isOpen={popoverOpen}
                onClose={togglePopover}
                closeOnBlur={false}
            >
                <PopoverTrigger>
                    <IconButton
                        variant="ghost"
                        aria-label="Toggle EcoPacking"
                        className="ecopacking-button"
                        onClick={togglePopover}
                    >
                        <Flex align="center">
                            <FaLeaf className="ecopacking-icon" color="green.700" />
                            <FaSuitcase className="ecopacking-icon" color="orange.900" />                        </Flex>
                    </IconButton>
                </PopoverTrigger>
                <PopoverContent
                    width="500px"
                    boxShadow="md"
                    p={2}
                    borderRadius="md"
                >
                    <PopoverArrow />
                    <PopoverCloseButton />
                    <PopoverBody>
                        <Recommendations flightId={flightId} />
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </Box>
    );
};
