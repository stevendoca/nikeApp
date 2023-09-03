import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import {
  Button,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { purple } from "@mui/material/colors";
import { Box } from "@mui/system";
import productApi from "api/productApi";
import userApi from "api/userApi";
import { useAppDispatch } from "app/hooks";
import { Product } from "models/products";
import { User } from "models/user";
import { ProductActions } from "pages/Dashboard/Product/module/ProductSlice";
import { UserActions } from "pages/Dashboard/User/module/UserSlice";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { makeStyles } from "tss-react/mui";
import { getToken } from "ultis/getToken";

type Props = {
  row: Product;
};

const useStyles = makeStyles()((theme) => ({
  favoriteTable: {
    backgroundColor: purple[400],
  },
  favoriteTitle: {
    // backgroundColor: "#ffb055",
  },
  img: {
    width: "50px",
  },
}));

const ProductRow: React.FC<Props> = ({ row }: Props) => {
  //? set open colapse menu
  const [open, setOpen] = React.useState(false);
  const { classes } = useStyles();
  const dispatch = useAppDispatch();

  const deleteUser = async (id: string) => {
    const data = {
      _id: id,
    };
    try {
      const token=getToken()
      const res = await productApi.delete(data,token);
      dispatch(ProductActions.deleteProduct(id));
      Swal.fire({
        title: "Success!",
        text: "Successful delete product",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error: any) {
      console.log(error.response);
    }
  };

  const handleDelete = (id: string, name: string) => {
    Swal.fire({
      title: `Do you want delete ${name}?`,
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `Delete`,
    }).then((result) => {
      if (result.isDenied) {
        deleteUser(id);
      }
    });
  };

  return (
    <React.Fragment>
      <TableRow key={row._id}>
        <TableCell>{row.name}</TableCell>
        <TableCell>
          <img src={row.img} width={"100px"} alt="nike" />
        </TableCell>
        <TableCell>{row.typeProduct}</TableCell>
        <TableCell>{row.gender}</TableCell>
        <TableCell>{row.price}</TableCell>
        <TableCell style={{ width: 160 }}>
          <Link to={`edit/${row._id}`}>
            <Button color="warning" variant="text">
              <EditIcon />
            </Button>
          </Link>
          <Button color="error" onClick={() => handleDelete(row._id, row.name)}>
            <DeleteForeverIcon />
          </Button>
        </TableCell>
      </TableRow>

      <TableRow className={classes.favoriteTable}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={12}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Favorite product
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead className={classes.favoriteTitle}>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Image</TableCell>
                    <TableCell align="right">Color</TableCell>
                    <TableCell align="right">Size</TableCell>
                    <TableCell align="right">Color</TableCell>
                    <TableCell align="right">Price</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.productsFavorite?.map((product) => (
                    <TableRow key={product._id}>
                      <TableCell component="th" scope="row">
                        {product._id}
                      </TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell align="right">
                        <img
                          className={classes.img}
                          src={product.img}
                          alt="nike"
                        />
                      </TableCell>
                      <TableCell align="right">{product.color}</TableCell>
                      <TableCell align="right">{product.size}</TableCell>
                      <TableCell align="right">{product.price}</TableCell>
                      <TableCell align="right">{product.color}</TableCell>
                    </TableRow>
                  ))} */}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export default ProductRow;
