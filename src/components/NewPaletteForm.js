import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography'; 
import IconButton from '@mui/material/IconButton'; 
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import DraggableColorList from './DraggableColorList ';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import PaletteFormNav from './PaletteFormNav';
import { arrayMove } from 'react-sortable-hoc'; 
import {arrayMoveImmutable} from 'array-move';
import ColorPickerForm from './ColorPickerForm';
import {withStyles} from '@mui/styles'; 

const drawerWidth = 400;

const styles = {
  container: {
    width: "90%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  buttons: {
    width: "100%"
  },
  button: {
    width: "50%"
  }
};

const sx = {
  width: drawerWidth,
  flexShrink: 0,
  height: "100vh",
  '& .MuiDrawer-paper': {
    width: drawerWidth,
    display: "flex",
    alignItems: "center"
    //boxSizing: 'border-box',
  },
};

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));


function NewPaletteForm ( props ) {
  const maxColors = 20; 
  const  { savePalette, palettes, classes } = props;
  const [open, setOpen] = React.useState(false);
  const [colors, setColors] = React.useState([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleSubmitSavePalette = (newPaletteName) => {
    let newPalette = {
      paletteName: newPaletteName,
      id: newPaletteName.toLowerCase().replace(/ /g,'-'),
      colors: colors
    };

    savePalette(newPalette);
    props.history.push('/'); 
  };

  const addNewColor = (newColor) => {
    setColors([...colors, newColor]);
  };
  
  const removeColor = (colorName) => {
    let updatedColors = colors.filter(color =>  color.name !== colorName);
    setColors(updatedColors);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
      let updatedColors = arrayMoveImmutable(colors, oldIndex, newIndex);
      setColors(updatedColors); 
  };

  const clearColors = () => {
    setColors([]); 
  };

  const addRandomColor = () => {
    let allColors = palettes.map(p => p.colors).flat(); 
    let randIndex = Math.floor( allColors.length * Math.random());
    let randColor = allColors[randIndex]; 
    setColors([...colors, randColor]); 
  }; 

  const isFullPalette = colors.length >= maxColors; 

  return (
    <Box sx={{ display: 'flex' }}>
      <PaletteFormNav
        palettes={palettes} 
        handleSubmitSavePalette={handleSubmitSavePalette} 
        handleDrawerOpen={handleDrawerOpen} 
        open={open}
      />

      <Drawer sx={sx} variant="persistent" anchor="left" open={open}>

        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <div className={classes.container}>
          <Typography variant='h4'> Design your Palette </Typography>

          <div className={classes.buttons}>
            <Button className={classes.button} variant='contained' color='secondary' onClick={clearColors}> Clear Palette </Button>
            <Button className={classes.button} variant='contained' color='primary' onClick={addRandomColor} disabled={isFullPalette}> Random Color </Button>
          </div>

          <ColorPickerForm
            colors={colors}
            addNewColor={addNewColor} 
            isFullPalette={isFullPalette}
          />
        </div>
      </Drawer>

      <Main open={open}>
        <DrawerHeader />
        <DraggableColorList
          colors={colors}
          removeColor={removeColor}
          axis='xy'
          onSortEnd={onSortEnd}
        />
      </Main>

    </Box>
  );
};

export default withStyles(styles)(NewPaletteForm);