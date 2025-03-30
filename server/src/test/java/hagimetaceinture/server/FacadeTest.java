package hagimetaceinture.server;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.sql.Date;
import java.util.Arrays;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import hagimetaceinture.server.circuit.Circuit;
import hagimetaceinture.server.circuit.CircuitRepository;
import hagimetaceinture.server.event.EventRepository;

@SpringBootTest
@AutoConfigureMockMvc
class FacadeTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CircuitRepository circuitRepo;

    @MockBean
    private EventRepository eventRepo;

    private Circuit circuit;

    @BeforeEach
    void setUp() {
        circuit = new Circuit("Monza");
        circuit.setId(1L);
        circuit.setCreationDate(Date.valueOf("1980-01-01"));
        circuit.setDistance(5.793);
        circuit.setTurnNumber(11);
        circuit.setBestTime(1.20);
        circuit.setPlace("Italy");
        circuit.setSpectatorNumber(100000);
    }

    @Test
    void testGetCircuits() throws Exception {
        when(circuitRepo.findAll()).thenReturn(Arrays.asList(circuit));

        mockMvc.perform(get("/api/circuits"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Monza"));
    }

    @Test
    void testGetCircuitById() throws Exception {
        when(circuitRepo.findById(1L)).thenReturn(Optional.of(circuit));

        mockMvc.perform(get("/api/circuits/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Monza"));
    }

    @Test
    void testGetCalendar() throws Exception {
        when(eventRepo.findAll()).thenReturn(Arrays.asList());

        mockMvc.perform(get("/api/calendar"))
                .andExpect(status().isOk());
    }

    // @Test
    // void testGetDate() throws Exception {
    // String date = "2025-01-01";

    // Circuit circuit = new Circuit("Monza");
    // circuit.setDate(Date.valueOf(date));

    // when(eventRepo.findAll()).thenReturn(Arrays.asList(circuit));

    // mockMvc.perform(get("/api/calendar/" + date))
    // .andExpect(status().isOk())
    // .andExpect(jsonPath("$[0].date").value(date));
    // }

    @Test
    void testEditCircuit() throws Exception {
        when(circuitRepo.findById(1L)).thenReturn(Optional.of(circuit));

        mockMvc.perform(post("/pi/circuits/1/edit"))
                .andExpect(status().isOk());
    }
}
