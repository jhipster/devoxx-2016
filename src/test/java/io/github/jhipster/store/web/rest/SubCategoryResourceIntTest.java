package io.github.jhipster.store.web.rest;

import io.github.jhipster.store.HispterstoreApp;

import io.github.jhipster.store.domain.SubCategory;
import io.github.jhipster.store.repository.SubCategoryRepository;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import static org.hamcrest.Matchers.hasItem;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SubCategoryResource REST controller.
 *
 * @see SubCategoryResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = HispterstoreApp.class)
public class SubCategoryResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAA";
    private static final String UPDATED_NAME = "BBBBB";

    private static final Boolean DEFAULT_ALCOHOL = false;
    private static final Boolean UPDATED_ALCOHOL = true;

    @Inject
    private SubCategoryRepository subCategoryRepository;

    @Inject
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Inject
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Inject
    private EntityManager em;

    private MockMvc restSubCategoryMockMvc;

    private SubCategory subCategory;

    @PostConstruct
    public void setup() {
        MockitoAnnotations.initMocks(this);
        SubCategoryResource subCategoryResource = new SubCategoryResource();
        ReflectionTestUtils.setField(subCategoryResource, "subCategoryRepository", subCategoryRepository);
        this.restSubCategoryMockMvc = MockMvcBuilders.standaloneSetup(subCategoryResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SubCategory createEntity(EntityManager em) {
        SubCategory subCategory = new SubCategory()
                .name(DEFAULT_NAME)
                .alcohol(DEFAULT_ALCOHOL);
        return subCategory;
    }

    @Before
    public void initTest() {
        subCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createSubCategory() throws Exception {
        int databaseSizeBeforeCreate = subCategoryRepository.findAll().size();

        // Create the SubCategory

        restSubCategoryMockMvc.perform(post("/api/sub-categories")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(subCategory)))
                .andExpect(status().isCreated());

        // Validate the SubCategory in the database
        List<SubCategory> subCategories = subCategoryRepository.findAll();
        assertThat(subCategories).hasSize(databaseSizeBeforeCreate + 1);
        SubCategory testSubCategory = subCategories.get(subCategories.size() - 1);
        assertThat(testSubCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSubCategory.isAlcohol()).isEqualTo(DEFAULT_ALCOHOL);
    }

    @Test
    @Transactional
    public void getAllSubCategories() throws Exception {
        // Initialize the database
        subCategoryRepository.saveAndFlush(subCategory);

        // Get all the subCategories
        restSubCategoryMockMvc.perform(get("/api/sub-categories?sort=id,desc"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
                .andExpect(jsonPath("$.[*].id").value(hasItem(subCategory.getId().intValue())))
                .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
                .andExpect(jsonPath("$.[*].alcohol").value(hasItem(DEFAULT_ALCOHOL.booleanValue())));
    }

    @Test
    @Transactional
    public void getSubCategory() throws Exception {
        // Initialize the database
        subCategoryRepository.saveAndFlush(subCategory);

        // Get the subCategory
        restSubCategoryMockMvc.perform(get("/api/sub-categories/{id}", subCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(subCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.alcohol").value(DEFAULT_ALCOHOL.booleanValue()));
    }

    @Test
    @Transactional
    public void getNonExistingSubCategory() throws Exception {
        // Get the subCategory
        restSubCategoryMockMvc.perform(get("/api/sub-categories/{id}", Long.MAX_VALUE))
                .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSubCategory() throws Exception {
        // Initialize the database
        subCategoryRepository.saveAndFlush(subCategory);
        int databaseSizeBeforeUpdate = subCategoryRepository.findAll().size();

        // Update the subCategory
        SubCategory updatedSubCategory = subCategoryRepository.findOne(subCategory.getId());
        updatedSubCategory
                .name(UPDATED_NAME)
                .alcohol(UPDATED_ALCOHOL);

        restSubCategoryMockMvc.perform(put("/api/sub-categories")
                .contentType(TestUtil.APPLICATION_JSON_UTF8)
                .content(TestUtil.convertObjectToJsonBytes(updatedSubCategory)))
                .andExpect(status().isOk());

        // Validate the SubCategory in the database
        List<SubCategory> subCategories = subCategoryRepository.findAll();
        assertThat(subCategories).hasSize(databaseSizeBeforeUpdate);
        SubCategory testSubCategory = subCategories.get(subCategories.size() - 1);
        assertThat(testSubCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSubCategory.isAlcohol()).isEqualTo(UPDATED_ALCOHOL);
    }

    @Test
    @Transactional
    public void deleteSubCategory() throws Exception {
        // Initialize the database
        subCategoryRepository.saveAndFlush(subCategory);
        int databaseSizeBeforeDelete = subCategoryRepository.findAll().size();

        // Get the subCategory
        restSubCategoryMockMvc.perform(delete("/api/sub-categories/{id}", subCategory.getId())
                .accept(TestUtil.APPLICATION_JSON_UTF8))
                .andExpect(status().isOk());

        // Validate the database is empty
        List<SubCategory> subCategories = subCategoryRepository.findAll();
        assertThat(subCategories).hasSize(databaseSizeBeforeDelete - 1);
    }
}
