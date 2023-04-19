import {
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllHistories } from "../../api/todoAPI";
import { AddCircle, Delete, Edit } from "@mui/icons-material";

export const History = () => {
  const [allHistories, setAllHistories] = useState();

  useEffect(() => {
    getAllHistories().then((data) => setAllHistories(data.reverse()));
  }, []);

  const phoneSize = useMediaQuery("(width < 740px)");

  return (
    <main className="main">
      {phoneSize ? (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography sx={{ fontWeight: "bold" }}>Title</Typography>
                </TableCell>
                <TableCell>
                  <Typography sx={{ fontWeight: "bold" }}>Type/Time</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allHistories?.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography sx={{ fontSize: "0.9rem" }}>
                      {history.title}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {history.typeOfModification === "Deleted" ? (
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <Delete sx={{ color: "red" }} />
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          Deleted
                        </Typography>
                      </Box>
                    ) : history.typeOfModification === "Edited" ? (
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <Edit sx={{ color: "blue" }} />
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          Edited
                        </Typography>
                      </Box>
                    ) : history.typeOfModification === "Added" ? (
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <AddCircle sx={{ color: "purple" }} />
                        <Typography sx={{ fontSize: "0.9rem" }}>
                          Added
                        </Typography>
                      </Box>
                    ) : (
                      ""
                    )}

                    <Typography sx={{ fontSize: "0.9rem" }}>
                      {history.time}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Title</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Type</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Time</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allHistories?.map((history, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography>{history.title}</Typography>
                  </TableCell>
                  <TableCell>
                    {history.typeOfModification === "Deleted" ? (
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <Delete sx={{ color: "red" }} />
                        <Typography>Deleted</Typography>
                      </Box>
                    ) : history.typeOfModification === "Edited" ? (
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <Edit sx={{ color: "blue" }} />
                        <Typography>Edited</Typography>
                      </Box>
                    ) : history.typeOfModification === "Added" ? (
                      <Box sx={{ display: "flex", gap: "5px" }}>
                        <AddCircle sx={{ color: "purple" }} />
                        <Typography>Added</Typography>
                      </Box>
                    ) : (
                      ""
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography>{history.time}</Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </main>
  );
};
