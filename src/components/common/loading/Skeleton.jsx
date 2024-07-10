import { Grid, Skeleton, Card, CardContent, Typography, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

const SkeletonCard = ({ contador }) => {
    const theme = useTheme();

    const getSize = (breakpoint) => {
        if (theme.breakpoints.values[breakpoint] <= theme.breakpoints.values.xs) return 60;
        if (theme.breakpoints.values[breakpoint] <= theme.breakpoints.values.sm) return 80;
        if (theme.breakpoints.values[breakpoint] <= theme.breakpoints.values.md) return 100;
        return 110;
    };

    const renderSkeletons = (contador) => {
        return Array.from({ length: contador }).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card sx={{ display: "flex", alignItems: 'center', padding: '4%', marginTop: 3 }}>
                    <Skeleton 
                        variant="circular" 
                        width={getSize('xs')}
                        height={getSize('xs')}
                        sx={{
                            [theme.breakpoints.up('sm')]: {
                                width: getSize('sm'),
                                height: getSize('sm'),
                            },
                            [theme.breakpoints.up('md')]: {
                                width: getSize('md'),
                                height: getSize('md'),
                            },
                            [theme.breakpoints.up('lg')]: {
                                width: getSize('lg'),
                                height: getSize('lg'),
                            },
                        }}
                    />
                    <CardContent sx={{ flex: '1 0 auto' }}>
                        <Skeleton 
                            variant="text" 
                            width={getSize('xs') * 1.5} 
                            sx={{
                                ml: { xs: 1, sm: 2 },
                                [theme.breakpoints.up('sm')]: {
                                    width: getSize('sm') * 1.5,
                                },
                                [theme.breakpoints.up('md')]: {
                                    width: getSize('md') * 2.5,
                                },
                            }}
                        />
                        <Typography variant="subtitle2" color="text.secondary">
                            <Skeleton 
                                variant="text" 
                                width={getSize('xs') * 2.5} 
                                sx={{
                                    ml: { xs: 1, sm: 2 },
                                    [theme.breakpoints.up('sm')]: {
                                        width: getSize('sm') * 2.5,
                                    },
                                    [theme.breakpoints.up('md')]: {
                                        width: getSize('md') * 2.5,
                                    },
                                }}
                            />
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ));
    };

    return (
        <Grid container spacing={4} paddingBottom={2}>
            {renderSkeletons(contador)}
        </Grid>
    );
};

SkeletonCard.propTypes = {
    contador: PropTypes.number.isRequired
};

export { SkeletonCard }