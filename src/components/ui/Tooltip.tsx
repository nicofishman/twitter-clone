import * as React from 'react';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';

import { cn } from '@/utils/cn';

const Tooltip = ({ ...props }) => (
    <TooltipPrimitive.Provider>
        <TooltipPrimitive.Root {...props} />
    </TooltipPrimitive.Provider>
);

Tooltip.displayName = TooltipPrimitive.Tooltip.displayName;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
    React.ElementRef<typeof TooltipPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
        ref={ref}
        className={cn(
            'z-50 overflow-hidden rounded-sm bg-slate-600 px-1 py-0.5 text-xs capitalize text-white shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1',
            className,
        )}
        sideOffset={sideOffset}
        {...props}
    />
));

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent };
