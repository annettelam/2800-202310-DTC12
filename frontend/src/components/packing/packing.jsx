import React, { useState } from 'react';
import { IconButton, Popover, PopoverBody } from '@chakra-ui/react';
import { ChatIcon } from '@chakra-ui/icons';
import { Recommendations } from '../recommendations/recommendations';
import '../packing/packing.css';

export const Packing = () => {
    const [popoverOpen, setPopoverOpen] = useState(false);
    const togglePopover = () => setPopoverOpen(!popoverOpen);

    return (
        <>
            <IconButton
                icon={<ChatIcon />}
                variant="outline"
                aria-label="Toggle Packing Assistant"
                className="chat-button"
                onClick={togglePopover}
            />
            <Popover placement="bottom" isOpen={popoverOpen} onClose={togglePopover}>
                <PopoverBody>
                    <Recommendations />
                </PopoverBody>
            </Popover>
        </>
    );
};
