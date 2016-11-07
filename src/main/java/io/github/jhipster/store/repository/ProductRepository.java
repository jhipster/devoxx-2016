package io.github.jhipster.store.repository;

import io.github.jhipster.store.domain.Product;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Product entity.
 */
@SuppressWarnings("unused")
public interface ProductRepository extends JpaRepository<Product,Long> {

    @Query("select distinct product from Product product left join fetch product.subcategories")
    List<Product> findAllWithEagerRelationships();

    @Query("select product from Product product left join fetch product.subcategories where product.id =:id")
    Product findOneWithEagerRelationships(@Param("id") Long id);

}
