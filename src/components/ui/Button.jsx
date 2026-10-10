import React from 'react';
import { clsx } from 'clsx';

import { ArrowRight, ArrowUpRight } from 'lucide-react';

export const Button = React.forwardRef(({
    children,
    variant = 'primary',
    className,
    href,
    icon = 'none',
    ...props
}, ref) => {
    const Comp = href ? 'a' : 'button';

    return (
        <Comp
            ref={ref}
            href={href}
            className={clsx(
                "btn",
                variant === 'primary' ? 'btn-primary' : 'btn-secondary',
                className
            )}
            {...props}
        >
            <span className="btn-text">{children}</span>
            {icon === 'right' && <ArrowRight className="btn-icon" size={18} />}
            {icon === 'up-right' && <ArrowUpRight className="btn-icon" size={18} />}
        </Comp>
    );
});
