'use client';

import { Button, ButtonProps, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ReactNode } from 'react';

interface Props extends ButtonProps {
    loading?: boolean;
    red?: boolean;
    children: ReactNode;
}

export function LoadingButton({loading, red = false, sx, children, disabled, variant, ...rest }: Props) {
    const theme = useTheme();

    return (
        <Button
            {...rest}
            disabled={disabled || loading}
            sx={{
                ...(sx || {}),
                ...(loading
                    ? {
                        paddingLeft: theme.spacing(2),
                        paddingRight: theme.spacing(2),
                    }
                    : {}),
                ...(red
                    ? variant === 'outlined'
                        ? {
                            borderColor: theme.palette.error.main,
                            color: theme.palette.error.main,
                            '&:hover': {
                                borderColor: theme.palette.error.dark,
                                color: theme.palette.error.dark,
                            },
                        }
                        : {
                            backgroundColor: theme.palette.error.main,
                            color: theme.palette.common.white,
                            '&:hover': {
                                backgroundColor: theme.palette.error.dark,
                            },
                        }
                    : {}),
            }}
        >
            {loading ? (
                <>
                    <CircularProgress
                        sx={{ color: 'inherit', marginRight: theme.spacing(1) }}
                        size={12}
                        thickness={4}
                    />
                    {children}
                </>
            ) : (
                children
            )}
        </Button>
    );
}
