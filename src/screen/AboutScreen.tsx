import { useState } from "react"
import { Button, TextField, IconButton } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import RefreshIcon from "@mui/icons-material/Refresh"
import { HomeIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function AboutScreen() {
  const [date, setDate] = useState("2025-01-08")
  const navigate = useNavigate()

  return (
    <div>
      <TextField 
        type="date" 
        value={date} 
        onChange={(e) => setDate(e.target.value)} 
      />
      <Button variant="outlined" startIcon={<SearchIcon />}>
        검색
      </Button>
      <Button 
        onClick={() => navigate("/")}
        variant="contained" 
        startIcon={<HomeIcon />}
      >
        메인
      </Button>
      <IconButton>
        <RefreshIcon />
      </IconButton>
    </div>
  )
}
