import { Grid, Skeleton, Card, CardContent, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const SkeletonCard = ({ contador }) => {
    const renderSkeletons = (contador) => {
        return Array.from({ length: contador }).map((_, index) => (
            <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                <Card sx={{ display: "flex", alignItems: 'center', padding: '4%', marginTop: 3, }}>
                    <Skeleton variant="circular" width={110} height={110} />
                    <CardContent>
                            <Skeleton variant="text" width={100} sx={{ ml: 2 }} />
                        <Typography variant="subtitle2" color="text.secondary">
                            <Skeleton variant="text" width={250} sx={{ ml: 2 }} />
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
    )
}

SkeletonCard.propTypes = {
    contador: PropTypes.number.isRequired
}

export {SkeletonCard}