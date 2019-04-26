package org.test.repository;

import org.test.domain.Associates;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data MongoDB repository for the Associates entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssociatesRepository extends MongoRepository<Associates, String> {
    @Query("{}")
    Page<Associates> findAllWithEagerRelationships(Pageable pageable);

    @Query("{}")
    List<Associates> findAllWithEagerRelationships();

    @Query("{'id': ?0}")
    Optional<Associates> findOneWithEagerRelationships(String id);

}
