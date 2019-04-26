package org.test.web.rest;

import org.test.TestApp;

import org.test.domain.Associates;
import org.test.repository.AssociatesRepository;
import org.test.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.Validator;

import java.util.ArrayList;
import java.util.List;


import static org.test.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the AssociatesResource REST controller.
 *
 * @see AssociatesResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = TestApp.class)
public class AssociatesResourceIntTest {

    private static final String DEFAULT_ASSOCIATE = "AAAAAAAAAA";
    private static final String UPDATED_ASSOCIATE = "BBBBBBBBBB";

    @Autowired
    private AssociatesRepository associatesRepository;

    @Mock
    private AssociatesRepository associatesRepositoryMock;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private Validator validator;

    private MockMvc restAssociatesMockMvc;

    private Associates associates;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AssociatesResource associatesResource = new AssociatesResource(associatesRepository);
        this.restAssociatesMockMvc = MockMvcBuilders.standaloneSetup(associatesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Associates createEntity() {
        Associates associates = new Associates()
            .associate(DEFAULT_ASSOCIATE);
        return associates;
    }

    @Before
    public void initTest() {
        associatesRepository.deleteAll();
        associates = createEntity();
    }

    @Test
    public void createAssociates() throws Exception {
        int databaseSizeBeforeCreate = associatesRepository.findAll().size();

        // Create the Associates
        restAssociatesMockMvc.perform(post("/api/associates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(associates)))
            .andExpect(status().isCreated());

        // Validate the Associates in the database
        List<Associates> associatesList = associatesRepository.findAll();
        assertThat(associatesList).hasSize(databaseSizeBeforeCreate + 1);
        Associates testAssociates = associatesList.get(associatesList.size() - 1);
        assertThat(testAssociates.getAssociate()).isEqualTo(DEFAULT_ASSOCIATE);
    }

    @Test
    public void createAssociatesWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = associatesRepository.findAll().size();

        // Create the Associates with an existing ID
        associates.setId("existing_id");

        // An entity with an existing ID cannot be created, so this API call must fail
        restAssociatesMockMvc.perform(post("/api/associates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(associates)))
            .andExpect(status().isBadRequest());

        // Validate the Associates in the database
        List<Associates> associatesList = associatesRepository.findAll();
        assertThat(associatesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    public void getAllAssociates() throws Exception {
        // Initialize the database
        associatesRepository.save(associates);

        // Get all the associatesList
        restAssociatesMockMvc.perform(get("/api/associates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(associates.getId())))
            .andExpect(jsonPath("$.[*].associate").value(hasItem(DEFAULT_ASSOCIATE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllAssociatesWithEagerRelationshipsIsEnabled() throws Exception {
        AssociatesResource associatesResource = new AssociatesResource(associatesRepositoryMock);
        when(associatesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restAssociatesMockMvc = MockMvcBuilders.standaloneSetup(associatesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAssociatesMockMvc.perform(get("/api/associates?eagerload=true"))
        .andExpect(status().isOk());

        verify(associatesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllAssociatesWithEagerRelationshipsIsNotEnabled() throws Exception {
        AssociatesResource associatesResource = new AssociatesResource(associatesRepositoryMock);
            when(associatesRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restAssociatesMockMvc = MockMvcBuilders.standaloneSetup(associatesResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restAssociatesMockMvc.perform(get("/api/associates?eagerload=true"))
        .andExpect(status().isOk());

            verify(associatesRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    public void getAssociates() throws Exception {
        // Initialize the database
        associatesRepository.save(associates);

        // Get the associates
        restAssociatesMockMvc.perform(get("/api/associates/{id}", associates.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(associates.getId()))
            .andExpect(jsonPath("$.associate").value(DEFAULT_ASSOCIATE.toString()));
    }

    @Test
    public void getNonExistingAssociates() throws Exception {
        // Get the associates
        restAssociatesMockMvc.perform(get("/api/associates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    public void updateAssociates() throws Exception {
        // Initialize the database
        associatesRepository.save(associates);

        int databaseSizeBeforeUpdate = associatesRepository.findAll().size();

        // Update the associates
        Associates updatedAssociates = associatesRepository.findById(associates.getId()).get();
        updatedAssociates
            .associate(UPDATED_ASSOCIATE);

        restAssociatesMockMvc.perform(put("/api/associates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAssociates)))
            .andExpect(status().isOk());

        // Validate the Associates in the database
        List<Associates> associatesList = associatesRepository.findAll();
        assertThat(associatesList).hasSize(databaseSizeBeforeUpdate);
        Associates testAssociates = associatesList.get(associatesList.size() - 1);
        assertThat(testAssociates.getAssociate()).isEqualTo(UPDATED_ASSOCIATE);
    }

    @Test
    public void updateNonExistingAssociates() throws Exception {
        int databaseSizeBeforeUpdate = associatesRepository.findAll().size();

        // Create the Associates

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAssociatesMockMvc.perform(put("/api/associates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(associates)))
            .andExpect(status().isBadRequest());

        // Validate the Associates in the database
        List<Associates> associatesList = associatesRepository.findAll();
        assertThat(associatesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    public void deleteAssociates() throws Exception {
        // Initialize the database
        associatesRepository.save(associates);

        int databaseSizeBeforeDelete = associatesRepository.findAll().size();

        // Delete the associates
        restAssociatesMockMvc.perform(delete("/api/associates/{id}", associates.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Associates> associatesList = associatesRepository.findAll();
        assertThat(associatesList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Associates.class);
        Associates associates1 = new Associates();
        associates1.setId("id1");
        Associates associates2 = new Associates();
        associates2.setId(associates1.getId());
        assertThat(associates1).isEqualTo(associates2);
        associates2.setId("id2");
        assertThat(associates1).isNotEqualTo(associates2);
        associates1.setId(null);
        assertThat(associates1).isNotEqualTo(associates2);
    }
}
