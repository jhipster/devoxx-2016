package io.github.jhipster.store.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.store.domain.Brand;

import io.github.jhipster.store.repository.BrandRepository;
import io.github.jhipster.store.web.rest.util.HeaderUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Brand.
 */
@RestController
@RequestMapping("/api")
public class BrandResource {

    private final Logger log = LoggerFactory.getLogger(BrandResource.class);
        
    @Inject
    private BrandRepository brandRepository;

    /**
     * POST  /brands : Create a new brand.
     *
     * @param brand the brand to create
     * @return the ResponseEntity with status 201 (Created) and with body the new brand, or with status 400 (Bad Request) if the brand has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/brands")
    @Timed
    public ResponseEntity<Brand> createBrand(@Valid @RequestBody Brand brand) throws URISyntaxException {
        log.debug("REST request to save Brand : {}", brand);
        if (brand.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert("brand", "idexists", "A new brand cannot already have an ID")).body(null);
        }
        Brand result = brandRepository.save(brand);
        return ResponseEntity.created(new URI("/api/brands/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert("brand", result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /brands : Updates an existing brand.
     *
     * @param brand the brand to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated brand,
     * or with status 400 (Bad Request) if the brand is not valid,
     * or with status 500 (Internal Server Error) if the brand couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/brands")
    @Timed
    public ResponseEntity<Brand> updateBrand(@Valid @RequestBody Brand brand) throws URISyntaxException {
        log.debug("REST request to update Brand : {}", brand);
        if (brand.getId() == null) {
            return createBrand(brand);
        }
        Brand result = brandRepository.save(brand);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert("brand", brand.getId().toString()))
            .body(result);
    }

    /**
     * GET  /brands : get all the brands.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of brands in body
     */
    @GetMapping("/brands")
    @Timed
    public List<Brand> getAllBrands() {
        log.debug("REST request to get all Brands");
        List<Brand> brands = brandRepository.findAll();
        return brands;
    }

    /**
     * GET  /brands/:id : get the "id" brand.
     *
     * @param id the id of the brand to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the brand, or with status 404 (Not Found)
     */
    @GetMapping("/brands/{id}")
    @Timed
    public ResponseEntity<Brand> getBrand(@PathVariable Long id) {
        log.debug("REST request to get Brand : {}", id);
        Brand brand = brandRepository.findOne(id);
        return Optional.ofNullable(brand)
            .map(result -> new ResponseEntity<>(
                result,
                HttpStatus.OK))
            .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    /**
     * DELETE  /brands/:id : delete the "id" brand.
     *
     * @param id the id of the brand to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/brands/{id}")
    @Timed
    public ResponseEntity<Void> deleteBrand(@PathVariable Long id) {
        log.debug("REST request to delete Brand : {}", id);
        brandRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert("brand", id.toString())).build();
    }

}
