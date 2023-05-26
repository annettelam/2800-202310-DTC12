import React, { useState } from 'react';
import { IconButton, Popover, PopoverBody } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { Recommendations } from '../recommendations/recommendations';
import '../packing/packing.css';

export const Packing = () => {
    const [popoverOpen, setPopoverOpen] = useState(false); // State variable for the popover open/close state
    const togglePopover = () => setPopoverOpen(!popoverOpen); // Function to toggle the popover state

    return (
        <>
            <IconButton
                icon={<ChatIcon />} // Renders a chat icon from Chakra UI icons
                variant="outline"
                aria-label="Toggle Packing Assistant"
                className="chat-button" // Custom CSS class for styling purposes
                onClick={togglePopover} // Toggle the popover on button click
            />
            <Popover placement="bottom" isOpen={popoverOpen} onClose={togglePopover}> // Popover component to display recommendations
                <PopoverBody>
                    <Recommendations /> // Renders the recommendations component
                </PopoverBody>
            </Popover>
        </>
    );
};
