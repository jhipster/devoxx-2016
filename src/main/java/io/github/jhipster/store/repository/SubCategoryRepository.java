package io.github.jhipster.store.repository;

import io.github.jhipster.store.domain.SubCategory;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the SubCategory entity.
 */
@SuppressWarnings("unused")
public interface SubCategoryRepository extends JpaRepository<SubCategory,Long> {

}
