package io.github.jhipster.store.repository;

import io.github.jhipster.store.domain.Brand;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Brand entity.
 */
@SuppressWarnings("unused")
public interface BrandRepository extends JpaRepository<Brand,Long> {

}
